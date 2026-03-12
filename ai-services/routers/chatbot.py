from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
from utils.gemini import get_gemini_model
from langchain.schema import SystemMessage, HumanMessage, AIChatMessage
import json

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = [] # List of {"role": "user"|"ai", "content": "..."}

SYSTEM_PROMPT = """
You are the Official AI Assistant for Lin's InfoTech — a premium technology agency.
Founded and led by Lin (CEO), we specialize in:
1. AI Development (Custom LLMs, Agents, RAG)
2. Web Development (Next.js, High-end UI/UX)
3. Mobile App Development (React Native, Flutter)
4. Automation Systems (Workflow automation, Python scripts)

Our values: Visual excellence, innovation, and production-ready clean code.
Our design theme: Red & Black, Glassmorphism.

Your goals:
- Answer questions about our services and process.
- Guide users to book a consultation or use our AI tools (Estimator, Proposal Generator).
- Be professional, expert, but helpful and approachable.
- If the user shows serious interest, try to capture their name and email (lead capture).
- Keep responses concise and formatted with markdown.
"""

@router.post("/")
async def chat(request: ChatRequest = Body(...)):
    try:
        model = get_gemini_model()
        
        messages = [SystemMessage(content=SYSTEM_PROMPT)]
        
        # Add history
        for msg in request.history:
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            else:
                messages.append(AIChatMessage(content=msg["content"]))
        
        # Add current message
        messages.append(HumanMessage(content=request.message))
        
        response = model.invoke(messages)
        
        return {
            "success": True, 
            "response": response.content,
            "role": "ai"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
