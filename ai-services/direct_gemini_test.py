import os
import google.generativeai as genai
from dotenv import load_dotenv
import traceback

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model_name = 'gemini-2.0-flash-exp'
print(f"Testing model: {model_name}")

try:
    model = genai.GenerativeModel(model_name)
    response = model.generate_content("Say 'Lin's InfoTech is powered by AI'")
    print(f"SUCCESS! Response: {response.text}")

except Exception as e:
    print(f"FAILED: {str(e)}")
    traceback.print_exc()
