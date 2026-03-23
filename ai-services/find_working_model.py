import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

try:
    models = genai.list_models()
    for m in models:
        if 'generateContent' in m.supported_generation_methods:
            # Test it
            try:
                model = genai.GenerativeModel(m.name)
                response = model.generate_content("Hi")
                if response.text:
                    print(m.name)
                    exit(0)
            except:
                continue
except Exception as e:
    print(f"Error: {e}")
    exit(1)
