from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List
from utils.gemini import get_gemini_model
from langchain.schema import SystemMessage, HumanMessage
import json

router = APIRouter()

class EstimationRequest(BaseModel):
    projectType: str
    features: List[str]
    budget: str
    timeline: str

SYSTEM_PROMPT = """
You are the Project Estimator for Lin's InfoTech. 
Analyze the project requirements and provide a structured estimation.
Return ONLY a valid JSON object with the following keys:
- estimatedCost: string (range in USD)
- estimatedTimeline: string
- recommendedTechStack: list of strings
- complexityScore: integer (1-10)
- breakdown: list of objects with {task: string, duration: string}
- justification: string (brief explanation)

Context: Lin's InfoTech delivers high-quality, production-ready solutions. 
Pricing should be competitive yet reflect premium quality.
"""

@router.post("/")
async def estimate(request: EstimationRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.2)
        
        prompt = f"Project Type: {request.projectType}\nFeatures: {', '.join(request.features)}\nBudget: {request.budget}\nTimeline: {request.timeline}"
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=prompt)
        ]
        
        response = model.invoke(messages)
        
        # Attempt to parse JSON
        try:
            # Clean response in case LLM adds markdown blocks
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, "data": data}
        except:
            return {"success": True, "raw": response.content}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
