from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage
import json

router = APIRouter()

class ValidationRequest(BaseModel):
    startupIdea: str

SYSTEM_PROMPT = """
You are the Startup Strategist at Lin's InfoTech. 
Validate the following startup idea with professional skepticism and innovative vision.
Return ONLY a valid JSON object with:
- viabilityScore: integer (0-100)
- marketAnalysis: string (brief overview)
- SWOT: {strengths: list, weaknesses: list, opportunities: list, threats: list}
- competitors: list of potential competitors (real or generic types)
- criticalSuccessFactors: list of strings
- pivotsConsiderations: list of strings

Be brutally honest yet constructive.
"""

@router.post("/")
async def validate_idea(request: ValidationRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.5)
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"Startup Idea: {request.startupIdea}")
        ]
        
        response = model.invoke(messages)
        
        try:
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, "validation": data}
        except:
            return {"success": True, "raw": response.content}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
