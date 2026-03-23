from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import Optional
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage
import json

router = APIRouter()

class EstimationRequest(BaseModel):
    features: str
    scale: str = "Small"
    platform: str = "Web"

SYSTEM_PROMPT = """
You are the Project Estimator for Lin's InfoTech. 
Analyze the project requirements and provide a structured estimation.
Return ONLY a valid JSON object with the following keys:
- budget: string (range in USD, e.g. "$12,000 - $18,000")
- timeline: string (e.g. "8 - 12 Weeks")
- analysis: string (brief explanation of the estimate)
- recommendedTechStack: list of strings
- complexityScore: integer (1-10)

Context: Lin's InfoTech delivers high-quality, production-ready solutions. 
Pricing should be competitive yet reflect premium quality.
"""

@router.post("/")
async def estimate(request: EstimationRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.2)
        
        prompt = f"Features: {request.features}\nComplexity/Scale: {request.scale}\nPlatform: {request.platform}"
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=prompt)
        ]
        
        response = model.invoke(messages)
        
        # Attempt to parse JSON
        try:
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, **data}
        except:
            return {"success": True, "budget": "Contact us for pricing", "timeline": "TBD", "analysis": response.content}
            
    except Exception as e:
        error_msg = str(e)
        if "RESOURCE_EXHAUSTED" in error_msg or "429" in error_msg:
            return {
                "success": True,
                "budget": "Request limit reached",
                "timeline": "Please wait a moment",
                "analysis": "I'm sorry, I'm receiving too many requests. Please try again in a few seconds!",
                "recommendedTechStack": ["Rate limited"],
                "complexityScore": 0,
                "notice": "rate_limited"
            }
        raise HTTPException(status_code=500, detail=error_msg)
