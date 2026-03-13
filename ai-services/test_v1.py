import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
# Testing v1 instead of v1beta
url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={key}"

payload = {
    "contents": [{
        "parts": [{ "text": "Hello" }]
    }]
}

try:
    response = requests.post(url, headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
