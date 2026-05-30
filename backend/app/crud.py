from sqlalchemy.orm import Session
from . import models, schemas
import uuid


def generate_ticket_id():
    return f"TKT-{str(uuid.uuid4())[:8].upper()}"


def create_ticket(db: Session, ticket: schemas.TicketCreate):

    ticket_id = generate_ticket_id()

    db_ticket = models.Ticket(
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open"
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_tickets(db: Session, search=None, status=None):

    query = db.query(models.Ticket)

    if search:
        query = query.filter(
            models.Ticket.customer_name.contains(search) |
            models.Ticket.customer_email.contains(search) |
            models.Ticket.subject.contains(search) |
            models.Ticket.description.contains(search) |
            models.Ticket.ticket_id.contains(search)
        )

    if status:
        query = query.filter(models.Ticket.status == status)

    return query.order_by(models.Ticket.created_at.desc()).all()


def get_ticket(db: Session, ticket_id: str):
    return db.query(models.Ticket).filter(
        models.Ticket.ticket_id == ticket_id
    ).first()


def update_ticket(
    db: Session,
    ticket_id: str,
    update_data: schemas.TicketUpdate
):

    ticket = get_ticket(db, ticket_id)

    if not ticket:
        return None

    if update_data.status:
        ticket.status = update_data.status

    if update_data.note_text:
        note = models.Note(
            ticket_id=ticket_id,
            note_text=update_data.note_text
        )

        db.add(note)

    db.commit()
    db.refresh(ticket)

    return ticket