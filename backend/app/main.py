from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth

# Initialize FastAPI app
app = FastAPI(
    title="Ticket Tracker API",
    description="Backend API for Ticket Tracker application with MySQL and JWT authentication.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows our React frontend (running on localhost:5173) to call this backend (running on localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],
)

# Include the Authentication Router
app.include_router(auth.router)


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "Welcome to Ticket Tracker API",
        "docs": "/docs"
    }
