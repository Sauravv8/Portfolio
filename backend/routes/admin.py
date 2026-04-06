import json
import os
import shutil
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from pydantic import BaseModel

load_env_path = Path(__file__).parent.parent / ".env"

BACKEND_DIR = Path(__file__).parent.parent
ADMIN_CONFIG_PATH = BACKEND_DIR / "admin_config.json"
PROFILES_DIR = BACKEND_DIR / "profiles"
RESUMES_DIR = BACKEND_DIR.parent / "resume"

router = APIRouter()

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")


# ── Schemas ──────────────────────────────────────────────────────────────────

class AdminLoginRequest(BaseModel):
    password: str


class ProfileSwitchRequest(BaseModel):
    profile_key: str


class ResumeDataUpdate(BaseModel):
    profile_key: str
    data: dict


# ── Auth helper ───────────────────────────────────────────────────────────────

def verify_admin(x_admin_password: str = None):
    """Simple password check via header."""
    from fastapi import Header
    return x_admin_password


def require_admin(x_admin_password: str = None):
    import os
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=BACKEND_DIR / ".env", override=True)
    password = os.getenv("ADMIN_PASSWORD", "admin123")
    if x_admin_password != password:
        raise HTTPException(status_code=401, detail="Invalid admin password")
    return True


# ── Helper ────────────────────────────────────────────────────────────────────

def _load_config() -> dict:
    with open(ADMIN_CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_config(config: dict):
    with open(ADMIN_CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2)


def _load_profile(profile_key: str) -> dict:
    config = _load_config()
    if profile_key not in config["profiles"]:
        raise HTTPException(status_code=404, detail=f"Profile '{profile_key}' not found")
    file_path = BACKEND_DIR / config["profiles"][profile_key]["file"]
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


def _save_profile(profile_key: str, data: dict):
    config = _load_config()
    if profile_key not in config["profiles"]:
        raise HTTPException(status_code=404, detail=f"Profile '{profile_key}' not found")
    file_path = BACKEND_DIR / config["profiles"][profile_key]["file"]
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


# ── Routes ────────────────────────────────────────────────────────────────────

@router.post("/admin/login")
async def admin_login(req: AdminLoginRequest):
    """Verify admin password."""
    import os
    from dotenv import load_dotenv
    load_dotenv(dotenv_path=BACKEND_DIR / ".env", override=True)
    password = os.getenv("ADMIN_PASSWORD", "admin123")
    if req.password != password:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"success": True, "message": "Login successful"}


@router.get("/admin/config")
async def get_config(x_admin_password: str = None):
    """Get current active profile and all profiles."""
    require_admin(x_admin_password)
    config = _load_config()
    active_key = config["active_profile"]
    active_data = _load_profile(active_key)
    return {
        "active_profile": active_key,
        "profiles": {
            key: {
                "label": val["label"],
                "resume_pdf": val.get("resume_pdf", ""),
            }
            for key, val in config["profiles"].items()
        },
        "active_data": active_data,
    }


@router.post("/admin/switch-profile")
async def switch_profile(req: ProfileSwitchRequest, x_admin_password: str = None):
    """Switch the active resume profile."""
    require_admin(x_admin_password)
    config = _load_config()
    if req.profile_key not in config["profiles"]:
        raise HTTPException(status_code=404, detail=f"Profile '{req.profile_key}' not found")
    config["active_profile"] = req.profile_key
    _save_config(config)
    return {"success": True, "active_profile": req.profile_key}


@router.get("/admin/profile/{profile_key}")
async def get_profile(profile_key: str, x_admin_password: str = None):
    """Get full resume data for a specific profile."""
    require_admin(x_admin_password)
    data = _load_profile(profile_key)
    return data


@router.put("/admin/profile/{profile_key}")
async def update_profile(profile_key: str, req: ResumeDataUpdate, x_admin_password: str = None):
    """Update resume data for a specific profile."""
    require_admin(x_admin_password)
    _save_profile(profile_key, req.data)
    return {"success": True, "message": f"Profile '{profile_key}' updated"}


@router.post("/admin/upload-resume/{profile_key}")
async def upload_resume_pdf(
    profile_key: str,
    file: UploadFile = File(...),
    x_admin_password: str = None
):
    """Upload a new resume PDF for a profile."""
    require_admin(x_admin_password)
    config = _load_config()
    if profile_key not in config["profiles"]:
        raise HTTPException(status_code=404, detail=f"Profile '{profile_key}' not found")
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")
    
    # Save to resume folder
    RESUMES_DIR.mkdir(exist_ok=True)
    dest = RESUMES_DIR / file.filename
    with open(dest, "wb") as out:
        content = await file.read()
        out.write(content)
    
    # Update config
    config["profiles"][profile_key]["resume_pdf"] = file.filename
    _save_config(config)
    
    # Try to extract text and update profile
    try:
        import fitz
        doc = fitz.open(dest)
        extracted_text = ""
        for page in doc:
            blocks = page.get_text("dict")["blocks"]
            for block in sorted(blocks, key=lambda b: (b["bbox"][1], b["bbox"][0])):
                if block["type"] == 0:
                    for line in block["lines"]:
                        line_text = " ".join(s["text"] for s in line["spans"]).strip()
                        if line_text:
                            extracted_text += line_text + "\n"
        doc.close()
        return {
            "success": True,
            "filename": file.filename,
            "extracted_preview": extracted_text[:500]
        }
    except Exception as e:
        return {
            "success": True,
            "filename": file.filename,
            "note": f"PDF saved but text extraction failed: {str(e)}"
        }


@router.get("/admin/active-profile")
async def get_active_profile():
    """Public endpoint — get the currently active profile data (for frontend)."""
    config = _load_config()
    active_key = config["active_profile"]
    data = _load_profile(active_key)
    return {"profile_key": active_key, "data": data}


@router.get("/resume/{filename}")
async def download_resume(filename: str):
    """Serve resume PDF for download."""
    resume_path = RESUMES_DIR / filename
    if not resume_path.exists():
        raise HTTPException(status_code=404, detail="Resume file not found")
    return FileResponse(
        path=str(resume_path),
        media_type="application/pdf",
        filename=filename,
    )
