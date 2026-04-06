import json
import os
from pathlib import Path

import httpx
from dotenv import load_dotenv

_ENV_PATH = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH, override=True)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-2.0-flash-exp:free"

_BACKEND_DIR = Path(__file__).parent.parent
_ADMIN_CONFIG_PATH = _BACKEND_DIR / "admin_config.json"


def _load_admin_config() -> dict:
    with open(_ADMIN_CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _load_active_resume() -> dict:
    config = _load_admin_config()
    active = config.get("active_profile", "fullstack")
    profile_file = config["profiles"][active]["file"]
    profile_path = _BACKEND_DIR / profile_file
    with open(profile_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _build_system_prompt(resume: dict) -> str:
    resume_str = json.dumps(resume, indent=2)
    name = resume.get("name", "Saurav")
    return f"""You are an AI assistant for {name}'s portfolio website.
Your job is to answer visitor questions strictly based on the resume data provided below.
If the requested information is not present in the resume data, respond with:
"This information is not available in the resume."
Do not hallucinate or invent details. Be concise, professional, and friendly.
Always respond in markdown-friendly format when listing items.

--- RESUME DATA ---
{resume_str}
--- END OF RESUME DATA ---"""


async def get_ai_reply(user_message: str) -> str:
    """
    Send user_message to OpenRouter with resume-injected system prompt.
    Loads the active profile fresh on each call so admin switches take effect immediately.
    """
    if not OPENROUTER_API_KEY:
        raise RuntimeError(
            "OPENROUTER_API_KEY is not set. Please add it to your backend/.env file.\n"
            "Get a free key at: https://openrouter.ai/keys"
        )

    # Load active resume fresh each time (so admin profile switch takes effect instantly)
    resume = _load_active_resume()
    system_prompt = _build_system_prompt(resume)

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Portfolio AI Chat",
        "Content-Type": "application/json",
    }

    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        "temperature": 0.4,
        "max_tokens": 800,
    }

    async with httpx.AsyncClient(timeout=45.0) as client:
        try:
            response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
            response.raise_for_status()
        except httpx.TimeoutException:
            raise RuntimeError("OpenRouter request timed out after 45s. Please try again.")
        except httpx.HTTPStatusError as exc:
            body = exc.response.text
            raise RuntimeError(
                f"OpenRouter API error {exc.response.status_code}: {body}"
            )

    data = response.json()

    try:
        reply = data["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError):
        raise RuntimeError(f"Unexpected response format from OpenRouter: {data}")

    return reply
