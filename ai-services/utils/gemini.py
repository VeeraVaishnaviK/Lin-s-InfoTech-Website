import os
from dotenv import load_dotenv
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # We allow it to be empty for now to prevent crash, but AI calls will fail
    print("WARNING: GEMINI_API_KEY not found in environment")

genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_model(model_name="gemini-2.0-flash", temperature=0.7):
    """
    Returns a configured LangChain ChatGoogleGenerativeAI model.
    Includes fallback logic for different model availability across accounts.
    """
    # Try gemini-1.5-flash, but if it's missing, newer keys often have 2.0-flash or 1.5-flash-8b
    return ChatGoogleGenerativeAI(
        model=model_name,
        google_api_key=GEMINI_API_KEY,
        temperature=temperature,
        transport="rest"
    )

def get_raw_gemini_model(model_name="gemini-1.5-flash"):
    """
    Returns a raw Google GenerativeAI model for advanced usage.
    """
    return genai.GenerativeModel(model_name)
