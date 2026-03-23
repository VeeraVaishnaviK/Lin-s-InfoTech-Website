from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage
import json

router = APIRouter()

class ValidationRequest(BaseModel):
    idea: str

SYSTEM_PROMPT = """
You are the Startup Strategist at Lin's InfoTech. 
Validate the following startup idea with professional skepticism and innovative vision.
Return ONLY a valid JSON object with:
- score: integer (0-100, viability score)
- summary: string (market analysis and key insights in 2-3 sentences)
- SWOT: {strengths: list, weaknesses: list, opportunities: list, threats: list}
- competitors: list of potential competitors (real or generic types)
- criticalSuccessFactors: list of strings

Be brutally honest yet constructive.
"""

@router.post("/")
async def validate_idea(request: ValidationRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.5)
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"Startup Idea: {request.idea}")
        ]
        
        response = model.invoke(messages)
        
        try:
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, **data}
        except:
            return {"success": True, "score": 70, "summary": response.content}
            
    except Exception as e:
        error_msg = str(e)
        if "RESOURCE_EXHAUSTED" in error_msg or "429" in error_msg:
            return {
                "success": True,
                "score": 0,
                "summary": "Rate limit exceeded. Please wait a moment and try again.",
                "notice": "rate_limited"
            }
        raise HTTPException(status_code=500, detail=error_msg)
