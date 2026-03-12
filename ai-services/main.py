from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Lin's InfoTech AI Services",
    description="FastAPI microservices powered by Google Gemini 1.5 Flash",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict to backend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Lin's InfoTech AI Services is running", "status": "healthy"}

@app.get("/health")
async def health():
    return {"status": "ok", "api_key_configured": bool(os.getenv("GEMINI_API_KEY"))}

# Routers
from routers import chatbot, estimator, proposal, analyzer, validator

app.include_router(chatbot.router, prefix="/api/ai/chatbot", tags=["Chatbot"])
app.include_router(estimator.router, prefix="/api/ai/estimator", tags=["Estimator"])
app.include_router(proposal.router, prefix="/api/ai/proposal", tags=["Proposal"])
app.include_router(analyzer.router, prefix="/api/ai/analyzer", tags=["Analyzer"])
app.include_router(validator.router, prefix="/api/ai/validator", tags=["Validator"])
