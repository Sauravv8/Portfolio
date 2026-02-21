from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base


class ChatHistory(Base):
    """Stores every user ↔ AI exchange with a timestamp."""

    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_message = Column(Text, nullable=False)
    ai_response = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)
