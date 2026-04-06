import json
from pathlib import Path
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()
MESSAGES_FILE = Path(__file__).parent.parent / "contact_messages.json"

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@router.post("/contact")
async def submit_contact(msg: ContactMessage):
    """Saves contact messages to a JSON file"""
    messages = []
    if MESSAGES_FILE.exists():
        try:
            with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
                messages = json.load(f)
        except Exception:
            messages = []
            
    messages.append({
        "timestamp": datetime.now().isoformat(),
        "name": msg.name,
        "email": msg.email,
        "message": msg.message
    })
    
    with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
        json.dump(messages, f, indent=2)
        
    return {"success": True, "message": "Message saved successfully"}
