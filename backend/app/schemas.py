from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr


# ==========================================
# USER SCHEMAS
# ==========================================

# Data required when a user signs up
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Optional[str] = "user"  # 'user' or 'manager'


# Data required when a user logs in
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Safe user information returned in API responses (never returns password!)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# Token response returned after successful login
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ==========================================
# TICKET SCHEMAS
# ==========================================

# Data required to create a new ticket
class TicketCreate(BaseModel):
    title: str
    description: str
    priority: Optional[str] = "Medium"  # 'Low', 'Medium', 'High'


# Body sent by a manager when rejecting a ticket
class TicketReject(BaseModel):
    rejection_reason: str


# Full ticket details returned by the API
class TicketResponse(BaseModel):
    id: int
    ticket_number: str
    title: str
    description: str
    priority: str
    status: str
    created_by_id: int
    reviewed_by_id: Optional[int] = None
    rejection_reason: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    # Include creator and reviewer user info if joined
    creator: Optional[UserResponse] = None
    reviewer: Optional[UserResponse] = None

    class Config:
        from_attributes = True


# Summary stats for dashboard counters (Total, Pending, Accepted, Rejected)
class DashboardStats(BaseModel):
    total_tickets: int
    pending_tickets: int
    accepted_tickets: int
    rejected_tickets: int
