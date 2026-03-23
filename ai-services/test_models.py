import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

models_to_test = [
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-1.0-pro",
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash-latest"
]

print(f"Testing with API Key: {api_key[:5]}...{api_key[-5:]}")

working_models = []

for model_name in models_to_test:
    try:
        print(f"Testing {model_name}...", end=" ")
        model = genai.GenerativeModel(model_name)
        response = model.generate_content("Hi")
        print("OK")
        working_models.append(model_name)
    except Exception as e:
        print(f"FAILED: {e}")

print("\nSummary of working models:")
for m in working_models:
    print(f"- {m}")

if working_models:
    with open("working_model.txt", "w") as f:
        f.write(working_models[0])
    print(f"\nSaved {working_models[0]} to working_model.txt")
else:
    print("\nNo working models found. Please check API key permissions in Google AI Studio.")
    # List all available models to see what IS allowed
    try:
        print("\nAll available models for this key:")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(f"- {m.name}")
    except Exception as e:
        print(f"Could not list models: {e}")
