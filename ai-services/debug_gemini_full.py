import os
import google.generativeai as genai
from dotenv import load_dotenv
import traceback

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print(f"Testing key: {api_key[:5]}...{api_key[-5:]}")

working_model = None

try:
    models = list(genai.list_models())
    print(f"Total models available: {len(models)}")
    for m in models:
        if 'generateContent' in m.supported_generation_methods:
            try:
                print(f"Testing {m.name}...", end=" ")
                model = genai.GenerativeModel(m.name)
                # Use a very simple prompt
                response = model.generate_content("test")
                if response.text:
                    print("OK")
                    working_model = m.name
                    break
            except Exception as e:
                print(f"ERROR: {str(e)[:100]}")
except Exception as e:
    print(f"CRITICAL ERROR: {e}")

if working_model:
    print(f"\nFOUND WORKING MODEL: {working_model}")
else:
    print("\nNO WORKING MODELS FOUND.")
