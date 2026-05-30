from fastapi import FastAPI

from .database import engine
from . import models
from .routes import tickets
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support CRM API"
)

app.include_router(
    tickets.router,
    prefix="/api"
)


@app.get("/")
def root():
    return {
        "message": "Support CRM API Running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)