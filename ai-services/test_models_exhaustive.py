import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)

test_models = ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.0-pro', 'gemini-2.0-flash-exp']

for m_name in test_models:
    try:
        print(f"Testing {m_name}...")
        model = genai.GenerativeModel(m_name)
        response = model.generate_content("Hi")
        print(f"✅ {m_name} works!")
    except Exception as e:
        print(f"❌ {m_name} failed: {e}")
