from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import ChatHistory
from schemas import ChatRequest, ChatResponse
from services.openrouter_service import get_ai_reply

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Accepts a user message, sends it to OpenRouter (Mistral-7B) with the
    resume-injected system prompt, stores the exchange in SQLite, and
    returns the AI reply.
    """
    user_message = request.message.strip()

    # Call OpenRouter
    try:
        ai_reply = await get_ai_reply(user_message)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    # Persist to database
    record = ChatHistory(
        user_message=user_message,
        ai_response=ai_reply,
        timestamp=datetime.utcnow(),
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return ChatResponse(reply=ai_reply)
