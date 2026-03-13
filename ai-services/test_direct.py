import os
import google.generativeai as genai

key = "AIzaSyD5Fu5NJ1WM_5xJ7v1wALh3BEklQiG3mRc"
genai.configure(api_key=key)

try:
    print("Testing gemini-1.5-flash-latest...")
    model = genai.GenerativeModel('gemini-1.5-flash-latest')
    response = model.generate_content("Hi")
    print("✅ gemini-1.5-flash-latest works!")
    print(response.text)
except Exception as e:
    print(f"❌ gemini-1.5-flash-latest failed: {e}")

try:
    print("Testing gemini-1.5-flash...")
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hi")
    print("✅ gemini-1.5-flash works!")
except Exception as e:
    print(f"❌ gemini-1.5-flash failed: {e}")
