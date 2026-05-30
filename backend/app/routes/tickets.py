from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from .. import schemas, crud

router = APIRouter()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post("/tickets", response_model=schemas.TicketCreateResponse)
def create_ticket(
    ticket: schemas.TicketCreate,
    db: Session = Depends(get_db)
):
    db_ticket = crud.create_ticket(db, ticket)
    return {"ticket_id": db_ticket.ticket_id, "created_at": db_ticket.created_at}



@router.get("/tickets", response_model=List[schemas.TicketListItem])
def get_tickets(
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    tickets = crud.get_tickets(db, search, status)
    # Return only the fields required by spec
    return [
        {
            "ticket_id": t.ticket_id,
            "customer_name": t.customer_name,
            "subject": t.subject,
            "status": t.status,
            "created_at": t.created_at
        }
        for t in tickets
    ]


@router.get("/tickets/{ticket_id}", response_model=schemas.TicketDetailResponse)
def get_ticket(
    ticket_id: str,
    db: Session = Depends(get_db)
):
    ticket = crud.get_ticket(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket   


@router.put("/tickets/{ticket_id}", response_model=schemas.TicketUpdateResponse)
def update_ticket(
    ticket_id: str,
    update_data: schemas.TicketUpdate,
    db: Session = Depends(get_db)
):
    ticket = crud.update_ticket(db, ticket_id, update_data)
    
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    
    return {
        "success": True,
        "updated_at": ticket.updated_at  
    }