from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


# Schema for user signup
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"  # 'user' or 'manager'


# Schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Schema for returning user data (never return password)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Schema for JWT login response
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
