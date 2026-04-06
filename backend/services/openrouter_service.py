import json
import os
from pathlib import Path
from typing import Dict, Any
import httpx
from dotenv import load_dotenv

_ENV_PATH = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH, override=True)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

MODELS = [
    "qwen/qwen3.6-plus:free",
    "openai/gpt-oss-120b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "stepfun/step-3.5-flash:free",
    "openai/gpt-oss-20b:free"
]

_BACKEND_DIR = Path(__file__).parent.parent
_ADMIN_CONFIG_PATH = _BACKEND_DIR / "admin_config.json"
_PROFILES_DIR = _BACKEND_DIR / "profiles"

def _load_active_resume() -> Dict[str, Any]:
    """Loads the active profile JSON determined by admin_config.json"""
    default_empty = {"name": "Saurav Chopade", "role": "Software Engineer"}
    
    if not _ADMIN_CONFIG_PATH.exists():
        return default_empty

    try:
        with open(_ADMIN_CONFIG_PATH, "r", encoding="utf-8") as f:
            config = json.load(f)
    except Exception:
        return default_empty

    active_profile_key = config.get("active_profile", "fullstack")
    profile_path = _PROFILES_DIR / f"{active_profile_key}.json"

    if not profile_path.exists():
        return default_empty

    try:
        with open(profile_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return default_empty


def _build_system_prompt(resume: Dict[str, Any]) -> str:
    """Builds the strict persona prompt injected with active resume data."""
    skills = resume.get("skills", [])
    if isinstance(skills, dict):
        skills_text = ", ".join(sum([v if isinstance(v, list) else [v] for v in skills.values()], []))
    else:
        skills_text = ", ".join(skills) if isinstance(skills, list) else str(skills)
        
    return f"""You are the AI representative for Saurav Chopade's portfolio.
You speak IN THE FIRST PERSON ("I am Saurav", "My projects include...").
You are professional, concise, and helpful. Keep answers relatively brief.

--- ACTIVE RESUME DATA ---
Name: {resume.get('name', 'Saurav Chopade')}
Role: {resume.get('role', 'Engineer')}
Summary: {resume.get('summary', '')}
Skills: {skills_text}
Projects: {json.dumps(resume.get('projects', []), indent=2)}
Contact: {json.dumps(resume.get('contact', {}), indent=2)}
--- END OF RESUME DATA ---"""


async def get_ai_reply(user_message: str) -> str:
    """
    Send user_message to OpenRouter with resume-injected system prompt.
    Tries multiple free models sequentially to bypass 429 Rate Limits and 404s.
    """
    if not OPENROUTER_API_KEY:
        raise RuntimeError(
            "OPENROUTER_API_KEY is not set. Please add it to your backend/.env file.\n"
            "Get a free key at: https://openrouter.ai/keys"
        )

    resume = _load_active_resume()
    system_prompt = _build_system_prompt(resume)

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Portfolio AI Chat",
        "Content-Type": "application/json",
    }

    last_error_text = ""
    for model_name in MODELS:
        payload = {
            "model": model_name,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message},
            ],
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(OPENROUTER_URL, headers=headers, json=payload, timeout=20.0)
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                
                error_data = response.text
                if response.status_code in [429, 404, 502, 503]:
                    last_error_text = f"{model_name} failed: {response.status_code} {error_data}"
                    continue
                else:
                    return f"⚠️ OpenRouter API error {response.status_code}: {error_data}"
            except Exception as e:
                last_error_text = str(e)
                continue

    return f"⚠️ AI is temporarily unavailable due to upstream provider caps across all free models. Please try again later! (Debug: {last_error_text})"
