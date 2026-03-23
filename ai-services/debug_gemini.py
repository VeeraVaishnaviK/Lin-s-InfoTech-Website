import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
print(f"Testing API key: {api_key[:10]}...")

try:
    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        google_api_key=api_key,
        temperature=0.7
    )
    message = HumanMessage(content="Say 'Lin's InfoTech is ready'")
    response = model.invoke([message])
    print(f"SUCCESS! Response: {response.content}")
except Exception as e:
    print(f"FAILED: {str(e)}")
    import traceback
    traceback.print_exc()
