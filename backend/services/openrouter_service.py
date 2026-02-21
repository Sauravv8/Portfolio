import json
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv

# Explicitly point to backend/.env (two levels up from services/)
_ENV_PATH = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH, override=True)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "mistralai/mistral-7b-instruct"

# Load resume data once at module import time
_RESUME_PATH = Path(__file__).parent.parent / "resume_data.json"
with open(_RESUME_PATH, "r", encoding="utf-8") as _f:
    RESUME_DATA: dict = json.load(_f)

RESUME_JSON_STR = json.dumps(RESUME_DATA, indent=2)

SYSTEM_PROMPT = f"""You are an AI assistant for {RESUME_DATA.get("name", "Saurav")}'s portfolio website.
Your job is to answer visitor questions strictly based on the resume data provided below.
If the requested information is not present in the resume data, respond with:
"This information is not available in the resume."
Do not hallucinate or invent details. Be concise, professional, and friendly.

--- RESUME DATA ---
{RESUME_JSON_STR}
--- END OF RESUME DATA ---"""


async def get_ai_reply(user_message: str) -> str:
    """
    Send user_message to OpenRouter (Mistral-7B) with the resume-injected
    system prompt. Returns the assistant reply string.
    Raises RuntimeError on API or network failure.
    """
    if not OPENROUTER_API_KEY:
        raise RuntimeError(
            "OPENROUTER_API_KEY is not set. Please add it to your backend/.env file.\n"
            "Get a free key at: https://openrouter.ai/keys"
        )

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Portfolio AI Chat",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        "temperature": 0.4,
        "max_tokens": 512,
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
            response.raise_for_status()
        except httpx.TimeoutException:
            raise RuntimeError("OpenRouter request timed out. Please try again.")
        except httpx.HTTPStatusError as exc:
            raise RuntimeError(
                f"OpenRouter API error {exc.response.status_code}: {exc.response.text}"
            )

    data = response.json()

    try:
        reply = data["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError):
        raise RuntimeError(f"Unexpected response format from OpenRouter: {data}")

    return reply
