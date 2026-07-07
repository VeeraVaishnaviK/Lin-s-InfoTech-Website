from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

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
        # Use gemini-1.5-flash which is the correct model name
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Convert history for Google Generative AI format
        chat_history = []
        for msg in request.history:
            role = "user" if msg["role"] == "user" else "model"
            chat_history.append({"role": role, "parts": [msg["content"]]})
        
        # Start chat with system prompt included in the first message or as instruction
        chat = model.start_chat(history=chat_history)
        
        # Prepend system prompt to the first message if history is empty
        full_message = request.message
        if not chat_history:
            full_message = f"Instruction: {SYSTEM_PROMPT}\n\nUser: {request.message}"
            
        response = chat.send_message(full_message)
        
        return {
            "success": True, 
            "response": response.text,
            "role": "ai"
        }
    except Exception as e:
        import traceback
        error_msg = str(e)
        
        # Log error
        with open("error_log.txt", "a") as f:
            f.write(f"--- Chat Error ({type(e).__name__}) ---\n")
            f.write(traceback.format_exc())
            f.write("\n")
            
        # Handle Rate Limit / Quota specifically
        if "RESOURCE_EXHAUSTED" in error_msg or "429" in error_msg:
            return {
                "success": True, # Still return success but with a notice
                "response": "I'm sorry, I'm receiving too many requests right now. Please wait a few seconds and try again!",
                "role": "ai",
                "notice": "rate_limited"
            }
            
        raise HTTPException(status_code=500, detail=error_msg)
