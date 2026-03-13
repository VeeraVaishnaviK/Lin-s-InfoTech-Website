try:
    import fastapi
    print("✅ fastapi ok")
    import uvicorn
    print("✅ uvicorn ok")
    import google.generativeai
    print("✅ google-generativeai ok")
    import langchain_google_genai
    print("✅ langchain-google-genai ok")
    import langchain_core
    print("✅ langchain-core ok")
    import dotenv
    print("✅ python-dotenv ok")
    from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
    print("✅ langchain message types ok")
except ImportError as e:
    print(f"❌ Missing dependency: {e}")
except Exception as e:
    print(f"❌ Error: {e}")
