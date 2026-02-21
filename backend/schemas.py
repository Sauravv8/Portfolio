from pydantic import BaseModel, field_validator


class ChatRequest(BaseModel):
    """Incoming chat message from the frontend."""

    message: str

    @field_validator("message")
    @classmethod
    def message_must_not_be_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message must not be empty.")
        if len(v) > 2000:
            raise ValueError("Message exceeds 2000 character limit.")
        return v


class ChatResponse(BaseModel):
    """AI reply sent back to the frontend."""

    reply: str


class ChatHistoryItem(BaseModel):
    """Schema for returning stored chat records (optional endpoint)."""

    id: int
    user_message: str
    ai_response: str
    timestamp: str

    class Config:
        from_attributes = True
