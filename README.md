# 🤖 Portfolio AI Chat

A production-ready personal portfolio website with an embedded **AI Resume Chat** powered by OpenRouter (Mistral-7B). Ask the bot anything about Saurav's skills, projects, and experience — it answers strictly from structured resume data.

**Tech stack:** React + Vite + TypeScript + Tailwind CSS (frontend) · FastAPI + SQLAlchemy + SQLite (backend)

---

## 📁 Project Structure

```
portfolio-ai-chat/
├── frontend/          # React + Vite + TypeScript + Tailwind
│   ├── src/
│   │   ├── api/          # Axios client
│   │   ├── components/   # Navbar, Hero, About, Skills, Projects, Chat, Contact, Footer
│   │   ├── types/        # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── index.css
│   ├── .env
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/           # FastAPI + SQLAlchemy
    ├── services/
    │   └── openrouter_service.py
    ├── routes/
    │   └── chat.py
    ├── main.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── resume_data.json
    ├── requirements.txt
    └── .env.example
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
FRONTEND_ORIGIN=http://localhost:5173
```

Get a free API key at [openrouter.ai/keys](https://openrouter.ai/keys).

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:8000
```

---

## 🚀 Running Locally

### 1. Backend

```bash
cd portfolio-ai-chat/backend

# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Set up env
copy .env.example .env           # Windows
# cp .env.example .env           # macOS/Linux
# Edit .env and add your OPENROUTER_API_KEY

# Start the server
uvicorn main:app --reload
```

Backend runs at **http://localhost:8000**  
API docs available at **http://localhost:8000/docs**

### 2. Frontend

```bash
cd portfolio-ai-chat/frontend
npm install
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🧪 Test the Chat API

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What skills does Saurav have?\"}"
```

Expected response:
```json
{ "reply": "Saurav has expertise in Python, React, FastAPI..." }
```

---

## 🏗️ Production Build

### Frontend

```bash
cd frontend
npm run build
# Serve the dist/ folder with any static host (Netlify, Vercel, Cloudflare Pages)
```

### Backend

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 🌐 Deployment — Cloudflare Tunnel

Expose your local backend to the internet without a server:

### 1. Install cloudflared
```bash
# Windows (winget)
winget install --id Cloudflare.cloudflared

# macOS
brew install cloudflared
```

### 2. Login & Create Tunnel
```bash
cloudflared tunnel login
cloudflared tunnel create portfolio-backend
```

### 3. Configure Tunnel
Create `~/.cloudflared/config.yml`:
```yaml
tunnel: portfolio-backend
credentials-file: ~/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: api.yourdomain.com
    service: http://localhost:8000
  - service: http_status:404
```

### 4. Run Tunnel
```bash
cloudflared tunnel run portfolio-backend
```

### 5. Update Frontend `.env`
```env
VITE_API_URL=https://api.yourdomain.com
```

### Quick Tunnel (testing only, no domain required):
```bash
cloudflared tunnel --url http://localhost:8000
```

---

## 🗄️ Database

SQLite database is created automatically at `backend/chat.db` on first run.

**Table:** `chat_history`
| Column | Type | Description |
|---|---|---|
| id | INTEGER (PK) | Auto-increment |
| user_message | TEXT | User's question |
| ai_response | TEXT | AI's reply |
| timestamp | DATETIME | UTC timestamp |

---

## 📝 Customisation

1. **Update resume data** — Edit `backend/resume_data.json` with your own details
2. **Update personal info** — Search for `example@gmail.com`, `+123-456-789`, `Saurav` in frontend components
3. **Add your photo** — Replace the placeholder in `src/components/About.tsx`
4. **Add your resume PDF** — Place `resume.pdf` in `frontend/public/`
5. **Change AI model** — Edit `MODEL` constant in `backend/services/openrouter_service.py`

---

## Security Notes

- `OPENROUTER_API_KEY` is **never** sent to the frontend
- CORS is restricted to `FRONTEND_ORIGIN` in `.env`
- All messages validated (max 2000 chars, no empty input)
- No sensitive data in responses
