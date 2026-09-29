# 🎫 Ticket Tracker

A full-stack Ticket Tracking web application built with **React** on the frontend and **FastAPI + MySQL** on the backend.

Designed to help teams submit, track, and manage support tickets with role-based access for users and managers.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Vanilla CSS**
- **JavaScript (ES6+)**

### Backend
- **Python 3.12**
- **FastAPI** (REST API Framework)
- **MySQL** (Relational Database)
- **SQLAlchemy** (ORM)
- **PyMySQL** (MySQL Driver)
- **JWT (PyJWT)** (Token Authentication)
- **Bcrypt** (Password Hashing)
- **Uvicorn** (ASGI Web Server)

---

## 🚀 Features

- **User Authentication**: Secure signup and login with hashed passwords and JWT token sessions.
- **Role-Based Access**: Separation between regular users and managers.
- **Ticket Management**: Create, view, filter, accept, and reject tickets with rejection reasons.
- **Dashboard Overview**: Summary statistics for Total, Pending, Accepted, and Rejected tickets.
- **Interactive API Docs**: Auto-generated Swagger documentation at `/docs`.

---

## 📁 Project Structure

```text
Ticket-Tracker/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app & CORS setup
│   │   ├── database.py      # MySQL engine & session setup
│   │   ├── models.py        # SQLAlchemy models (User, Ticket)
│   │   ├── schemas.py       # Pydantic schemas for validation
│   │   ├── auth.py          # Password hashing & JWT helpers
│   │   └── routes/
│   │       └── auth.py      # Signup, Login, and User profile routes
│   ├── .env                 # Database credentials & JWT secret
│   └── requirements.txt     # Python dependencies
├── src/                     # React Frontend source code
│   ├── pages/               # Login, Signup, Dashboard pages
│   ├── services/            # API services (auth, tickets)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## ⚙️ Setup and Installation

### 1. Database Setup (MySQL)
Open MySQL Workbench or your MySQL terminal and create the database:
```sql
CREATE DATABASE ticket_tracker_db;
```

---

### 2. Backend Setup

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables in `backend/.env`:
   ```env
   DATABASE_URL=mysql+pymysql://<user>:<password>@localhost:3306/ticket_tracker_db
   SECRET_KEY=supersecretjwtkey_change_me_in_production_12345
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ```

5. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   Backend will run on `http://127.0.0.1:8000` (Swagger docs: `http://127.0.0.1:8000/docs`).

---

### 3. Frontend Setup

1. In another terminal, navigate to the root directory:
   ```bash
   cd ..
   ```

2. Install npm packages (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate and get JWT token |
| `GET` | `/api/auth/me` | Get current logged-in user profile |
| `POST` | `/api/tickets` | Create a new ticket |
| `GET` | `/api/tickets` | View all tickets (filtered by status) |
| `GET` | `/api/tickets/{id}` | Get ticket details |
| `PUT` | `/api/tickets/{id}/accept` | Accept a ticket (Manager only) |
| `PUT` | `/api/tickets/{id}/reject` | Reject a ticket with reason (Manager only) |