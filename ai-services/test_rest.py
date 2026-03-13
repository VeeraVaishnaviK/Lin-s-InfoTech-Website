import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
print(f"Testing key: {key[:5]}...{key[-5:] if key else 'None'}")

genai.configure(api_key=key, transport='rest')

try:
    print("Direct test with REST transport...")
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello")
    print(f"✅ Success: {response.text[:50]}...")
except Exception as e:
    print(f"❌ Error: {e}")
