from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="user", nullable=False)  # user or manager
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # User tickets relation
    created_tickets = relationship(
        "Ticket",
        back_populates="creator",
        foreign_keys="Ticket.created_by_id"
    )

    reviewed_tickets = relationship(
        "Ticket",
        back_populates="reviewer",
        foreign_keys="Ticket.reviewed_by_id"
    )


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_number = Column(String(20), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), default="Medium")
    status = Column(String(20), default="Pending", nullable=False)

    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    reviewed_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    rejection_reason = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    creator = relationship(
        "User",
        back_populates="created_tickets",
        foreign_keys=[created_by_id]
    )
    reviewer = relationship(
        "User",
        back_populates="reviewed_tickets",
        foreign_keys=[reviewed_by_id]
    )
