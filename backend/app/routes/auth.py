from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app import models, schemas
from app.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# User signup
@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )

    # Hash password and save user
    hashed_pwd = hash_password(user_data.password)
    user_role = user_data.role if user_data.role in ["user", "manager"] else "user"

    new_user = models.User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_pwd,
        role=user_role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# User login
@router.post("/login", response_model=schemas.Token)
def login(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email).first()

    if not user or not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

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


# Current logged in user info
@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user
