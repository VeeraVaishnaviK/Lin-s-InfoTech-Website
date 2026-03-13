import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key, transport='rest')

print(f"Testing key: {key[:5]}...")

models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
print(f"Found {len(models)} models.")

for m_name in models:
    # Remove 'models/' prefix if present for the test
    short_name = m_name.replace('models/', '')
    print(f"Testing {short_name}...", end=" ", flush=True)
    try:
        model = genai.GenerativeModel(short_name)
        response = model.generate_content("Hi")
        print("✅ SUCCESS!")
        print(f"FOUND WORKING MODEL: {short_name}")
        # Save it
        with open('WORKING_NAME.txt', 'w') as f:
            f.write(short_name)
        break
    except Exception as e:
        print(f"❌ Failed: {e}")
