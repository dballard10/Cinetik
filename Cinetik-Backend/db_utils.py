#!/usr/bin/env python3
"""
Database utility CLI for Cinetik Backend

Usage:
    python db_utils.py test          # Test database connection
    python db_utils.py create        # Create database if it doesn't exist
    python db_utils.py init          # Full database initialization
    python db_utils.py status        # Show database status
"""

import sys
import argparse
from database import test_db_connection, ensure_database_exists, engine
from sqlalchemy import text
from config import settings
from init_db import init_db

def show_status():
    """Show database connection status and basic info."""
    print("📊 Cinetik Database Status")
    print("=" * 40)
    print(f"Host: {settings.DB_HOST}")
    print(f"Port: {settings.DB_PORT}")
    print(f"Database: {settings.DB_NAME}")
    print(f"User: {settings.DB_USER}")
    print("-" * 40)
    
    if test_db_connection():
        try:
            with engine.connect() as conn:
                # Get table count
                result = conn.execute(text("""
                    SELECT COUNT(*) 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                """))
                table_count = result.fetchone()[0]
                print(f"Tables in database: {table_count}")
                
        except Exception as e:
            print(f"Could not get additional info: {e}")
    
def main():
    parser = argparse.ArgumentParser(description="Cinetik Database Utilities")
    parser.add_argument('command', choices=['test', 'create', 'init', 'status'],
                       help='Command to execute')
    
    args = parser.parse_args()
    
    if args.command == 'test':
        print("🔍 Testing database connection...")
        success = test_db_connection()
        sys.exit(0 if success else 1)
        
    elif args.command == 'create':
        print("🏗️ Creating database...")
        success = ensure_database_exists()
        sys.exit(0 if success else 1)
        
    elif args.command == 'init':
        success = init_db()
        sys.exit(0 if success else 1)
        
    elif args.command == 'status':
        show_status()

if __name__ == "__main__":
    main() 