from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.gemini import get_gemini_model
from langchain.schema import SystemMessage, HumanMessage
import json

router = APIRouter()

class AnalyzerRequest(BaseModel):
    requirementText: str

SYSTEM_PROMPT = """
You are the Lead Quality Engineer at Lin's InfoTech. 
Analyze the provided requirement text and extract actionable insights.
Return ONLY a valid JSON object with:
- summarizedRequirements: list of strings
- identifiedRisks: list of strings
- techStackSuggestions: list of strings
- proposedRoadmap: list of phases with {phase: string, goal: string}
- gapAnalysis: list of strings (what is missing in requirements)

Be thorough and technical.
"""

@router.post("/")
async def analyze_requirements(request: AnalyzerRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.3)
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"Requirements Text:\n{request.requirementText}")
        ]
        
        response = model.invoke(messages)
        
        try:
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, "analysis": data}
        except:
            return {"success": True, "raw": response.content}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
