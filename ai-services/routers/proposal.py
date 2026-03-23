from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage

router = APIRouter()

class ProposalRequest(BaseModel):
    title: str
    goals: str
    audience: str = ""

SYSTEM_PROMPT = """
You are the Senior Solution Architect at Lin's InfoTech. 
Generate a comprehensive, professional business proposal for a potential client.
The proposal should be formatted in high-quality Markdown.
Include these sections:
1. Executive Summary
2. Proposed Solution Overview
3. Technical Architecture & Tech Stack
4. Core Features & Scope
5. Project Roadmap (Phases)
6. Why Lin's InfoTech?
7. Estimated Cost & Next Steps

Tone: Persuasive, professional, authoritative, and innovative.
Targeting: High-end businesses looking for AI-powered transformation.
"""

@router.post("/")
async def generate_proposal(request: ProposalRequest = Body(...)):
    try:
        model = get_gemini_model(temperature=0.7)
        
        prompt = f"Project Title: {request.title}\nCore Goals: {request.goals}"
        if request.audience:
            prompt += f"\nTarget Audience: {request.audience}"
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=prompt)
        ]
        
        response = model.invoke(messages)
        
        return {
            "success": True,
            "proposal": response.content
        }
            
    except Exception as e:
        error_msg = str(e)
        if "RESOURCE_EXHAUSTED" in error_msg or "429" in error_msg:
            return {
                "success": True,
                "proposal": "## ⚠️ Rate Limit Reached\n\nI'm sorry, I'm receiving too many requests right now. Please wait a few seconds and try again!",
                "notice": "rate_limited"
            }
        raise HTTPException(status_code=500, detail=error_msg)
