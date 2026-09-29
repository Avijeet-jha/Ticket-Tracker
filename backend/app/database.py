import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

# Load variables from the .env file
load_dotenv()

# We support either individual variables (recommended so passwords with '@' don't break)
# or a full DATABASE_URL string.
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST", "localhost")
db_port = os.getenv("DB_PORT", "3306")
db_name = os.getenv("DB_NAME", "ticket_tracker_db")

if db_user and db_password is not None:
    # URL.create automatically handles special characters like '@', '#', or '$' in passwords
    connection_url = URL.create(
        drivername="mysql+pymysql",
        username=db_user,
        password=db_password,
        host=db_host,
        port=int(db_port),
        database=db_name,
    )
else:
    # Fallback to DATABASE_URL if provided
    connection_url = os.getenv("DATABASE_URL")

# Create the SQLAlchemy engine that manages MySQL connections
engine = create_engine(
    connection_url,
    pool_pre_ping=True,  # Automatically tests connection freshness
    echo=False           # Set to True if you want to print all executed SQL queries
)

# Each request gets its own database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class which our database models (User, Ticket) will inherit from
Base = declarative_base()


# Dependency function to provide a database session to FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
