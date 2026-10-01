from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, tickets

app = FastAPI(title="Ticket Tracker API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(tickets.router)


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "Ticket Tracker API is running"
    }
