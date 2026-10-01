from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas

router = APIRouter(prefix="/api/tickets", tags=["Tickets"])


def format_ticket(ticket: models.Ticket) -> dict:
    created_str = ticket.created_at.strftime("%d %b %Y, %I:%M %p") if ticket.created_at else ""

    return {
        "id": ticket.id,
        "ticket_number": ticket.ticket_number,
        "title": ticket.title,
        "description": ticket.description,
        "priority": ticket.priority,
        "status": ticket.status,
        "user": ticket.creator.name if ticket.creator else "Unknown",
        "created_by_id": ticket.created_by_id,
        "reviewed_by_id": ticket.reviewed_by_id,
        "reviewed_by_name": ticket.reviewer.name if ticket.reviewer else None,
        "rejection_reason": ticket.rejection_reason,
        "created_at": ticket.created_at,
        "updated_at": ticket.updated_at,
        "dateTime": created_str,
    }



# Get all tickets with optional filter
@router.get("", response_model=List[schemas.TicketResponse])
def get_tickets(status_filter: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Ticket)
    if status_filter and status_filter.lower() != "all":
        query = query.filter(models.Ticket.status.ilike(status_filter))

    tickets = query.order_by(models.Ticket.id.asc()).all()
    return [format_ticket(t) for t in tickets]


# Get ticket by ID
@router.get("/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket #{ticket_id} not found"
        )
    return format_ticket(ticket)


# Update ticket status (approve or reject)
@router.patch("/{ticket_id}/status", response_model=schemas.TicketResponse)
def update_status(ticket_id: int, payload: schemas.TicketStatusUpdate, db: Session = Depends(get_db)):
    ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket #{ticket_id} not found"
        )

    ticket.status = payload.status
    if payload.rejection_reason is not None:
        ticket.rejection_reason = payload.rejection_reason

    if payload.status == "Pending":
        ticket.reviewed_by_id = None
        ticket.rejection_reason = None
    elif payload.reviewed_by_id is not None:
        ticket.reviewed_by_id = payload.reviewed_by_id

    db.commit()
    db.refresh(ticket)
    # Reload relation to guarantee latest reviewer name is populated
    if ticket.reviewed_by_id:
        ticket.reviewer = db.query(models.User).filter(models.User.id == ticket.reviewed_by_id).first()

    return format_ticket(ticket)


