import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)

print(f"Testing all available models for key: {key[:5]}...")

try:
    available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
    print(f"Found {len(available_models)} candidate models.")
    
    for m_name in available_models:
        print(f"Testing {m_name}...", end=" ", flush=True)
        try:
            model = genai.GenerativeModel(m_name)
            response = model.generate_content("Hi")
            print("✅ WORKS!")
            print(f"--- SUCCESS with {m_name} ---")
            break
        except Exception as e:
            print(f"❌ Failed: {e}")
            
except Exception as e:
    print(f"❌ Error listing models: {e}")
