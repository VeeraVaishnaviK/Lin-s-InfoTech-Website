from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage
import json

router = APIRouter()

class AnalyzerRequest(BaseModel):
    text: str

SYSTEM_PROMPT = """
You are the Lead Quality Engineer at Lin's InfoTech. 
Analyze the provided requirement text and extract actionable insights.
Return ONLY a valid JSON object with:
- score: integer (0-100, overall quality/completeness score of the requirements)
- summary: string (key insights and recommendations in 2-3 sentences)
- summarizedRequirements: list of strings
- identifiedRisks: list of strings
- techStackSuggestions: list of strings
- gapAnalysis: list of strings (what is missing in requirements)

Be thorough and technical.
"""

@router.post("/")
async def analyze_requirements(request: AnalyzerRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.3)
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=f"Requirements Text:\n{request.text}")
        ]
        
        response = model.invoke(messages)
        
        try:
            content = response.content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return {"success": True, **data}
        except:
            return {"success": True, "score": 75, "summary": response.content}
            
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
