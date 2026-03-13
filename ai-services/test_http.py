import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"

payload = {
    "contents": [{
        "parts": [{ "text": "Hello" }]
    }]
}

print(f"Testing URL: {url.split('key=')[0]}key=HIDDEN")

try:
    response = requests.post(url, headers={'Content-Type': 'application/json'}, data=json.dumps(payload))
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
