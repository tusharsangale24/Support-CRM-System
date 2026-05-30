# Support CRM System

Customer support ticketing system built with FastAPI + SQLite (backend) and React + Tailwind (frontend).

## Features
- Create tickets with customer info
- List all tickets
- Search across name, email, ID, subject, description
- Filter by status (Open, In Progress, Closed)
- View ticket details
- Update status and add notes

## Tech Stack
- Backend: Python, FastAPI, SQLAlchemy, SQLite
- Frontend: React, React Router, Tailwind CSS, Vite
- Deployment: Railway.app

## Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
```bash
cd frontend
npm install
npm run dev