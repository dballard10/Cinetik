from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from config import settings

engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_db_connection() -> bool:
    """
    Test database connectivity and return True if successful, False otherwise.
    """
    try:
        engine_test = create_engine(
            settings.DATABASE_URL,
            connect_args={"connect_timeout": 10}
        )
        
        with engine_test.connect() as connection:
            result = connection.execute(text("SELECT version()"))
            version = result.fetchone()[0]
            print(f"✅ Database connection successful!")
            print(f"PostgreSQL version: {version}")
            return True
            
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def ensure_database_exists() -> bool:
    """
    Ensure the target database exists, create it if it doesn't.
    Returns True if database exists/was created successfully, False otherwise.
    """
    connection_params = {
        'host': settings.DB_HOST,
        'port': settings.DB_PORT,
        'user': settings.DB_USER,
        'password': settings.DB_PASSWORD,
        'database': 'postgres'  # Connect to default database
    }
    
    try:
        conn = psycopg2.connect(**connection_params)
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s", (settings.DB_NAME,))
        exists = cursor.fetchone()
        
        if exists:
            print(f"✅ Database '{settings.DB_NAME}' already exists!")
        else:
            # Create the database
            cursor.execute(f'CREATE DATABASE "{settings.DB_NAME}"')
            print(f"✅ Database '{settings.DB_NAME}' created successfully!")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error ensuring database exists: {e}")
        return False 