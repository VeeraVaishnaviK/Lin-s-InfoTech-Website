# Lin's InfoTech — AI-Powered Technology Agency

A fully AI-powered technology agency website offering AI development, web development, mobile apps, and automation systems.

## Project Structure

```
lins-infotech/
├── frontend/          → Next.js 14 (App Router) + Tailwind CSS + Framer Motion
├── backend/           → Node.js + Express.js API
├── ai-services/       → Python FastAPI microservices (Google Gemini API)
├── docs/              → Architecture, API specs, schemas
└── README.md
```

## Tech Stack

| Layer        | Technology                                      |
|-------------|------------------------------------------------|
| Frontend    | Next.js 14, Tailwind CSS, Framer Motion        |
| Backend     | Node.js, Express.js                             |
| Database    | MongoDB (Mongoose)                              |
| AI Services | Python, FastAPI, Google Gemini API, LangChain   |
| Auth        | JWT (access + refresh tokens)                   |
| Deployment  | Vercel (frontend), Docker + Render (backend/AI) |

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
npm install
npm run dev
```

### Frontend (coming soon)

### AI Services (coming soon)

## License

Proprietary — Lin's InfoTech © 2026
