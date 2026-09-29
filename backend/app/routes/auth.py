from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# ==========================================
# 1. USER SIGNUP (STORE DATA IN MYSQL)
# ==========================================
@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user:
    1. Check if email already exists in MySQL
    2. Hash the password with bcrypt
    3. Save the new user row to MySQL
    4. Return the newly created user (without password)
    """
    # Check for existing email
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )

    # Hash the password
    secure_hashed_password = hash_password(user_data.password)

    # Create new User model instance
    new_user = models.User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=secure_hashed_password,
        role=user_data.role if user_data.role in ["user", "manager"] else "user"
    )

    # Add and commit to MySQL
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ==========================================
# 2. USER LOGIN (CHECK DATA FROM MYSQL)
# ==========================================
@router.post("/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate user login:
    1. Look up user by email in MySQL
    2. Verify the plain password against the stored bcrypt hash
    3. Generate a JWT token if credentials are valid
    4. Return the access token and user information
    """
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    
    # If user doesn't exist or password doesn't match
    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create JWT token with user's email and role in the payload
    token_data = {
        "sub": user.email,
        "id": user.id,
        "name": user.name,
        "role": user.role
    }
    token = create_access_token(data=token_data)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user
    }


# ==========================================
# 3. GET CURRENT LOGGED IN USER
# ==========================================
@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    """
    Return basic information about the currently authenticated user.
    """
    return current_user
