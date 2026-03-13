from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List
from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage

router = APIRouter()

class ProposalRequest(BaseModel):
    businessType: str
    features: List[str]
    timeline: str
    budget: str

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
        
        prompt = f"Business Type: {request.businessType}\nRequired Features: {', '.join(request.features)}\nExpected Timeline: {request.timeline}\nBudget Range: {request.budget}"
        
        messages = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=prompt)
        ]
        
        response = model.invoke(messages)
        
        return {
            "success": True,
            "proposalMarkdown": response.content
        }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
