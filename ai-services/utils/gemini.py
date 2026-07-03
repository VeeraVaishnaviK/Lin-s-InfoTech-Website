import os
import re
import json
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

# Configure Google Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Set up global Mock Mode flag
# Force mock mode if using the leaked key or if key is missing
KNOWN_LEAKED_KEY = "AIzaSyA4YXrAkK0e_zRgDp75m-OH6q8THjOr2-c"
USE_MOCK_MODE = (not GEMINI_API_KEY) or (GEMINI_API_KEY == KNOWN_LEAKED_KEY)

if USE_MOCK_MODE:
    print("--- [MOCK AI] Leaked or missing Gemini API Key detected. Activating Intelligent Local Mock AI Fallback Layer ---")
else:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"Error configuring Google GenerativeAI: {e}. Forcing Mock Mode.")
        USE_MOCK_MODE = True

# Mock classes for genai (GenerativeModel / chatbot)
class MockResponse:
    def __init__(self, text):
        self.text = text

class MockChatSession:
    def __init__(self, model_name, history=None):
        self.model_name = model_name
        self.history = history or []

    def send_message(self, message):
        response_text = generate_mock_chatbot_response(message, self.history)
        # Update history
        self.history.append({"role": "user", "parts": [message]})
        self.history.append({"role": "model", "parts": [response_text]})
        return MockResponse(response_text)

class MockGenerativeModel:
    def __init__(self, model_name):
        self.model_name = model_name

    def start_chat(self, history=None):
        return MockChatSession(self.model_name, history)
        
    def generate_content(self, contents, **kwargs):
        # Fallback for direct generation
        prompt = str(contents)
        response_text = generate_mock_chatbot_response(prompt, [])
        return MockResponse(response_text)

# Mock classes for langchain (ChatGoogleGenerativeAI)
class MockLangchainResponse:
    def __init__(self, content):
        self.content = content

class MockLangchainModel:
    def __init__(self, model_name, temperature=0.7):
        self.model_name = model_name
        self.temperature = temperature

    def invoke(self, messages):
        # Extract prompt from messages
        system_content = ""
        human_content = ""
        for m in messages:
            if m.__class__.__name__ == 'SystemMessage' or m.__class__.__name__ == 'SystemMessageChunk':
                system_content = m.content
            elif m.__class__.__name__ == 'HumanMessage' or m.__class__.__name__ == 'HumanMessageChunk':
                human_content = m.content
            elif hasattr(m, 'content'):
                human_content = m.content
                
        # Route to appropriate mock generator based on system prompt or messages
        if "Estimator" in system_content or "estimate" in system_content.lower() or "budget" in system_content.lower():
            # Estimate
            features = "Custom app features"
            scale = "Small"
            platform = "Web"
            features_match = re.search(r"Features:\s*(.*?)\n", human_content, re.DOTALL | re.IGNORECASE)
            if features_match:
                features = features_match.group(1).strip()
            scale_match = re.search(r"Complexity/Scale:\s*(.*?)\n", human_content, re.IGNORECASE)
            if scale_match:
                scale = scale_match.group(1).strip()
            platform_match = re.search(r"Platform:\s*(.*)$", human_content, re.IGNORECASE)
            if platform_match:
                platform = platform_match.group(1).strip()
                
            data = generate_mock_estimate(features, scale, platform)
            return MockLangchainResponse(json.dumps(data))
            
        elif "proposal" in system_content.lower() or "Architect" in system_content or "proposal" in human_content.lower():
            # Proposal
            title = "My App"
            goals = "Scale business"
            audience = ""
            title_match = re.search(r"Project Title:\s*(.*?)\n", human_content, re.IGNORECASE)
            if title_match:
                title = title_match.group(1).strip()
            goals_match = re.search(r"Core Goals:\s*(.*?)(?:\n|$)", human_content, re.IGNORECASE)
            if goals_match:
                goals = goals_match.group(1).strip()
            audience_match = re.search(r"Target Audience:\s*(.*)$", human_content, re.IGNORECASE)
            if audience_match:
                audience = audience_match.group(1).strip()
                
            proposal_md = generate_mock_proposal(title, goals, audience)
            return MockLangchainResponse(proposal_md)
            
        elif "Lead Quality Engineer" in system_content or "Analyzer" in system_content or "extract" in system_content.lower():
            # Analyzer
            req_text = human_content.replace("Requirements Text:", "").strip()
            data = generate_mock_analysis(req_text)
            return MockLangchainResponse(json.dumps(data))
            
        elif "Startup Strategist" in system_content or "Validate" in system_content or "startup" in system_content.lower():
            # Validator
            idea_text = human_content.replace("Startup Idea:", "").strip()
            data = generate_mock_validation(idea_text)
            return MockLangchainResponse(json.dumps(data))
            
        else:
            # Default
            return MockLangchainResponse("Mock Langchain Response")

# --- Generators definitions ---
def generate_mock_chatbot_response(message: str, history: list) -> str:
    msg_lower = message.lower()
    if "founder" in msg_lower or "ceo" in msg_lower or "owner" in msg_lower or "who is rejolin" in msg_lower or "who started" in msg_lower or "rejolin" in msg_lower:
        return "Lin's InfoTech was founded and is led by our CEO, **Rejolin Solomon J**! Rejolin is a visionary software engineer and prominent developer community leader who also serves as the President of the Google Developer Groups (GDG) on Campus at SIMATS, Student Convenor for the Institution's Innovation Council (IIC), and an Intel AI Student Community Ambassador."
    elif "service" in msg_lower or "offer" in msg_lower or "what do you do" in msg_lower or "specialize" in msg_lower:
        return "At Lin's InfoTech, we specialize in:\n\n1. **AI Development:** Custom LLMs, AI agents, Retrieval-Augmented Generation (RAG), and smart automation.\n2. **Web Development:** Modern Next.js applications, premium high-end UI/UX, and responsive landing pages.\n3. **Mobile Development:** High-performance React Native and Flutter mobile applications.\n4. **Automation Systems:** Custom workflow automations and Python scripts to streamline your business operations.\n\nWhich of these features are you interested in?"
    elif "tech" in msg_lower or "stack" in msg_lower or "language" in msg_lower or "framework" in msg_lower:
        return "We use cutting-edge, industry-standard technologies to deliver premium products:\n- **Frontend:** Next.js, React, TailwindCSS, GSAP for rich micro-animations.\n- **Backend:** Node.js (Express), FastAPI (Python), Mongoose/MongoDB.\n- **AI:** Google Gemini API, OpenAI API, LangChain.\n- **Mobile:** React Native, Flutter."
    elif "design" in msg_lower or "theme" in msg_lower or "look" in msg_lower or "aesthetic" in msg_lower:
        return "Our signature design theme features a sleek **Red & Black** palette, immersive **Glassmorphism**, smooth gradients, and rich **GSAP micro-animations** that breathe life into the UI. We prioritize visual excellence in every single project!"
    elif "price" in msg_lower or "cost" in msg_lower or "quote" in msg_lower or "expensive" in msg_lower or "budget" in msg_lower:
        return "Our pricing depends on the scale and complexity of the project, but we always deliver premium, production-ready quality. I highly recommend using our **Project Estimator** tool on the website to get an instant budget range, or booking a direct consultation with us!"
    elif "contact" in msg_lower or "book" in msg_lower or "consult" in msg_lower or "hire" in msg_lower or "meeting" in msg_lower or "schedule" in msg_lower:
        return "You can easily schedule a consultation by going to the **Contact** page or clicking **Book Consultation** in the navigation bar! Alternatively, drop your name and email here, and our CEO Lin will personally reach out to you."
    elif "hi" in msg_lower or "hello" in msg_lower or "hey" in msg_lower or "greetings" in msg_lower:
        return "Hello! I am the official AI Assistant for Lin's InfoTech. How can I help you today? Feel free to ask about our services, our CEO/founder, our design style, or how to get a quote!"
    else:
        return "That is a great question! Lin's InfoTech specializes in advanced technology transformations, web applications, and AI integrations. Whether you need custom LLMs, custom web design, or premium branding, we've got you covered. Would you like to schedule a consultation with our team?"

def generate_mock_estimate(features: str, scale: str, platform: str) -> dict:
    comp_score = 4
    if "ai" in features.lower() or "llm" in features.lower() or "chatbot" in features.lower():
        comp_score += 3
    if scale.lower() == "medium":
        comp_score += 2
    elif scale.lower() == "large":
        comp_score += 4
        
    base_price = 5000 if platform.lower() == "web" else 8000
    base_price *= (comp_score / 4)
    
    min_price = int(base_price * 0.9)
    max_price = int(base_price * 1.2)
    
    weeks_min = int(comp_score * 1.2)
    weeks_max = int(comp_score * 1.8)
    
    tech_stack = ["Next.js", "TailwindCSS", "Node.js (Express)", "MongoDB"]
    if "ai" in features.lower():
        tech_stack.extend(["FastAPI", "Google Gemini API", "LangChain"])
    if platform.lower() == "mobile":
        tech_stack = ["React Native", "Expo", "FastAPI", "MongoDB"]
        
    return {
        "budget": f"${min_price:,} - ${max_price:,}",
        "timeline": f"{weeks_min} - {weeks_max} Weeks",
        "analysis": f"Based on your requirements for a {scale.lower()}-scale {platform.lower()} application with features: '{features}', we suggest a premium development path. This estimate accounts for custom UI design, responsive layout, integration of required services, and robust testing.",
        "recommendedTechStack": tech_stack,
        "complexityScore": min(comp_score, 10)
    }

def generate_mock_proposal(title: str, goals: str, audience: str) -> str:
    return f"""# Project Proposal: {title}
    
## 1. Executive Summary
We are pleased to submit this proposal for **{title}** by Lin's InfoTech. Our team specializes in crafting state-of-the-art technological solutions that unite cutting-edge AI features with visually breathtaking frontend interfaces. This proposal outlines our strategy to achieve your core goal: *"{goals}"*.

## 2. Proposed Solution Overview
For {title}, we propose a modern, high-performance solution tailored to your target audience: *{audience if audience else "Premium Users"}*. Our architecture prioritizes absolute speed, security, and visual wow-factor.

## 3. Technical Architecture & Tech Stack
To ensure maximum scalability and clean maintainability, we recommend:
*   **Frontend:** Next.js (App Router), TailwindCSS, GSAP animations.
*   **Backend Services:** Express.js + Python (FastAPI) for lightweight microservices.
*   **AI Integration:** Google Gemini API for real-time generative capabilities.
*   **Database:** MongoDB Atlas (fully secure, auto-scaling cluster).

## 4. Core Features & Scope
*   **Premium Interactive UI:** Sleek Glassmorphism aesthetic with responsive layouts.
*   **Intelligent AI Integrations:** High-speed data processing and custom conversational interfaces.
*   **Robust Lead & Client Portal:** Secure authentication and responsive client dashboard.

## 5. Project Roadmap (Phases)
1.  **Phase 1: Blueprint & Visual Design (Weeks 1-3):** User flows, interactive wireframes, and design token setups.
2.  **Phase 2: Core Development (Weeks 4-8):** Database structures, API endpoints, AI microservices integration.
3.  **Phase 3: Integration & Animation (Weeks 9-11):** Next.js layout composition, GSAP animations, and end-to-end testing.
4.  **Phase 4: Launch & Handover (Week 12):** Production optimization and cloud deployment.

## 6. Why Lin's InfoTech?
*   **Visual Excellence:** We create premium interfaces that captivate users.
*   **AI Experts:** Deep experience integrating Google Gemini, custom LLMs, and RAG.
*   **Clean Code:** Production-ready codebases with zero technical debt.

## 7. Estimated Cost & Next Steps
We estimate the development timeline to be 10-12 weeks. To begin, we invite you to book a 30-minute scoping consultation with our CEO, Lin, to finalize the specifications.
"""

def generate_mock_analysis(text: str) -> dict:
    return {
        "score": 85,
        "summary": f"Your requirement document is well-structured and clearly lays out the scope for development. We recommend focusing on details regarding API endpoints and data model definitions to minimize ambiguity.",
        "summarizedRequirements": [
            "Design of a modern, responsive user interface.",
            "Integration of AI conversational or processing capabilities.",
            "Creation of secure user authentication and dashboard views."
        ],
        "identifiedRisks": [
            "Complex API dependencies requiring robust error handling.",
            "Potential rate limit constraints with generative AI models under high traffic."
        ],
        "techStackSuggestions": ["Next.js", "FastAPI", "MongoDB", "GSAP"],
        "gapAnalysis": [
            "Define exact target API payloads and latency budgets.",
            "Detail the exact branding guidelines and visual theme expectations."
        ]
    }

def generate_mock_validation(idea: str) -> dict:
    return {
        "score": 90,
        "summary": f"The startup idea: '{idea}' has a highly strong product-market fit in the current landscape. There is significant demand for automated, visually stunning, and AI-powered solutions.",
        "SWOT": {
            "strengths": ["High market interest in custom AI agents", "Short time-to-market using Next.js & FastAPI"],
            "weaknesses": ["Requires continuous API cost management", "Relies heavily on public LLM performance stability"],
            "opportunities": ["B2B SaaS licensing models", "Expansion into customized enterprise workflow templates"],
            "threats": ["Rapidly evolving competition in low-code AI builders", "Shifting API usage guidelines from major providers"]
        },
        "competitors": ["Generic DIY AI builders", "Niche agency competitors", "Low-fidelity templates"],
        "criticalSuccessFactors": [
            "Seamless and captivating visual user experience.",
            "High reliability of local microservice logic and prompt security."
        ]
    }

# --- Exported Functions with Fallbacks ---

def get_gemini_model(model_name="gemini-2.5-flash", temperature=0.7):
    """
    Returns a configured LangChain ChatGoogleGenerativeAI model.
    If Mock Mode is active, returns a MockLangchainModel.
    """
    if USE_MOCK_MODE:
        return MockLangchainModel(model_name, temperature)
        
    try:
        # Test constructor
        return ChatGoogleGenerativeAI(
            model=model_name,
            google_api_key=GEMINI_API_KEY,
            temperature=temperature,
        )
    except Exception as e:
        print(f"[MOCK AI] Error constructing ChatGoogleGenerativeAI: {e}. Falling back to Mock Model.")
        return MockLangchainModel(model_name, temperature)

def get_raw_gemini_model(model_name="gemini-2.5-flash"):
    """
    Returns a raw Google GenerativeAI model.
    """
    if USE_MOCK_MODE:
        return MockGenerativeModel(model_name)
    try:
        return genai.GenerativeModel(model_name)
    except Exception as e:
        print(f"[MOCK AI] Error constructing GenerativeModel: {e}. Falling back to Mock Model.")
        return MockGenerativeModel(model_name)

# Monkeypatch genai.GenerativeModel directly for chatbot.py!
if USE_MOCK_MODE:
    genai.GenerativeModel = MockGenerativeModel
