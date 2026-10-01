from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# Auth schemas
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# Ticket schemas
class TicketCreate(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "Medium"


class TicketStatusUpdate(BaseModel):
    status: str
    rejection_reason: Optional[str] = None


class TicketResponse(BaseModel):
    id: int
    ticket_number: str
    title: str
    description: str
    priority: str
    status: str
    user: Optional[str] = None
    created_by_id: int
    reviewed_by_id: Optional[int] = None
    rejection_reason: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    dateTime: Optional[str] = None

    class Config:
        from_attributes = True
