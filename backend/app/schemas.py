from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class NoteBase(BaseModel):
    note_text: str


class NoteResponse(NoteBase):
    created_at: datetime

    class Config:
        orm_mode = True


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class TicketUpdate(BaseModel):
    status: Optional[str] = None
    note_text: Optional[str] = None


class TicketResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    created_at: datetime
    notes: List[NoteResponse] = []

    class Config:
        orm_mode = True

class TicketCreateResponse(BaseModel):
    ticket_id: str
    created_at: datetime

class TicketListItem(BaseModel):
    ticket_id: str
    customer_name: str
    subject: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class NoteInDetail(BaseModel):
    note_text: str
    created_at: datetime

    class Config:
        from_attributes = True


class TicketDetailResponse(BaseModel):
    ticket_id: str
    customer_name: str
    customer_email: str
    subject: str
    description: str
    status: str
    notes: List[NoteInDetail] = []

    class Config:
        from_attributes = True

class TicketUpdateResponse(BaseModel):
    success: bool
    updated_at: datetime