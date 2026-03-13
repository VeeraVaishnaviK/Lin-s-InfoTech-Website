import os
from dotenv import load_dotenv
load_dotenv()

from utils.gemini import get_gemini_model
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

def test_chatbot():
    print("Starting chatbot test...")
    try:
        model = get_gemini_model()
        print(f"Model initialized: {model}")
        
        messages = [
            SystemMessage(content="You are a helpful assistant."),
            HumanMessage(content="Hello!")
        ]
        
        print("Invoking model...")
        response = model.invoke(messages)
        print("✅ Response received:")
        print(response.content)
    except Exception as e:
        print(f"❌ Error during test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_chatbot()
