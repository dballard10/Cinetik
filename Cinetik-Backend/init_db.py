from database import engine, ensure_database_exists, test_db_connection
from models.media import Base as MediaBase
from models.favorites import Base as FavoriteBase
from models.watches import Base as WatchBase
from models.friends import Base as FriendBase
import sys

def init_db():
    """
    Initialize the database by ensuring it exists and creating all tables.
    """
    print("🚀 Initializing Cinetik database...")
    print("-" * 50)
    
    # Step 1: Ensure database exists
    print("1. Ensuring database exists...")
    if not ensure_database_exists():
        print("❌ Failed to ensure database exists. Exiting.")
        return False
    
    # Step 2: Test connection
    print("\n2. Testing database connection...")
    if not test_db_connection():
        print("❌ Database connection test failed. Exiting.")
        return False
    
    # Step 3: Create tables
    print("\n3. Creating database tables...")
    try:
        MediaBase.metadata.create_all(bind=engine)
        FavoriteBase.metadata.create_all(bind=engine)
        WatchBase.metadata.create_all(bind=engine)
        FriendBase.metadata.create_all(bind=engine)
        print("✅ All database tables created successfully!")
        
    except Exception as e:
        print(f"❌ Error creating tables: {e}")
        return False
    
    print("\n🎉 Database initialization completed successfully!")
    return True

if __name__ == "__main__":
    success = init_db()
    sys.exit(0 if success else 1) 