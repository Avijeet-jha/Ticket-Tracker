from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class User(Base):
    """
    Represents a registered user in the system.
    Can have the role 'user' (can create tickets) or 'manager' (can accept/reject tickets).
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="user", nullable=False)  # 'user' or 'manager'
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    # One user can create many tickets
    created_tickets = relationship(
        "Ticket",
        back_populates="creator",
        foreign_keys="Ticket.created_by_id"
    )

    # One manager can review (accept/reject) many tickets
    reviewed_tickets = relationship(
        "Ticket",
        back_populates="reviewer",
        foreign_keys="Ticket.reviewed_by_id"
    )


class Ticket(Base):
    """
    Represents an issue or support ticket submitted by a user.
    """
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_number = Column(String(20), unique=True, index=True, nullable=False)  # e.g., 'TCK-101'
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    priority = Column(String(20), default="Medium")  # 'Low', 'Medium', 'High'
    status = Column(String(20), default="Pending", nullable=False)  # 'Pending', 'Accepted', 'Rejected'

    # Foreign key to track who created the ticket
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Foreign key to track which manager reviewed it (null while still Pending)
    reviewed_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Rejection reason entered by manager if status becomes 'Rejected'
    rejection_reason = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships to access user objects directly
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
