import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

try:
    print("Full Model List:")
    models = genai.list_models()
    for m in models:
        print(f"- {m.name} (Methods: {m.supported_generation_methods})")

except Exception as e:
    print(f"FAILED TO LIST MODELS: {str(e)}")
