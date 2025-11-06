import uvicorn
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models.favorites import Favorite, Favorites, FavoritePydantic
from models.watches import Watch, Watches, WatchPydantic
from models.media import Media, MediaPydantic
from models.friends import Friend, Friends, FriendPydantic
from database import get_db, Base, engine
from config import settings
from typing import List

print("🔌 Establishing database connection...")
# Create database tables
try:
    Base.metadata.create_all(bind=engine)
    print("🗄️ Database tables created successfully!")
    print("🔌 Database connection established!")
    DATABASE_CONNECTED = True
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    print("⚠️ Starting application without database connection.")
    print("📝 Please check your database configuration and network settings.")
    DATABASE_CONNECTED = False

app = FastAPI()
print("🚀 FastAPI application initialized!")

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "https://cinetik.vercel.app",
    "https://*.vercel.app",
    "https://www.cinetik.app",
    "https://cinetik.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

########## HEALTH CHECK ##########

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "database_connected": DATABASE_CONNECTED,
        "message": "Database connection successful" if DATABASE_CONNECTED else "Database connection failed - check configuration"
    }

########## FAVORITES ##########

@app.get("/favorites", response_model=Favorites)
def get_favorites(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Number of items per page"),
    db: Session = Depends(get_db)
):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"🌟 Getting favorites - page {page}, limit {limit}...")
    
    # Calculate offset
    offset = (page - 1) * limit
    
    # Get paginated favorites
    favorites = db.query(Favorite).offset(offset).limit(limit).all()
    return Favorites(favorites=[f.to_pydantic() for f in favorites])

@app.post("/favorites", response_model=Favorites)
def add_favorite(favorite: FavoritePydantic, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("⭐ Adding new favorite...")
    # First check if media exists, create it if it doesn't
    media = db.query(Media).filter(Media.id == favorite.media["id"]).first()
    if not media:
        print("📝 Media not found, creating new media entry...")
        # Create the media first
        new_media = Media(
            id=favorite.media["id"],
            name=favorite.media["name"],
            backdrop_path=favorite.media.get("backdrop_path", ""),
            media_type=favorite.media["media_type"]
        )
        db.add(new_media)
        db.commit()
        db.refresh(new_media)
        media = new_media
    
    # Check if favorite already exists
    existing_favorite = db.query(Favorite).filter(Favorite.media_id == media.id).first()
    if existing_favorite:
        raise HTTPException(status_code=400, detail="Media already in favorites")
    
    # Create new favorite
    new_favorite = Favorite(media_id=media.id)
    db.add(new_favorite)
    db.commit()
    db.refresh(new_favorite)
    
    favorites = db.query(Favorite).all()
    return Favorites(favorites=[f.to_pydantic() for f in favorites])

@app.delete("/favorites/{media_id}", response_model=Favorites)
def remove_favorite(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"🗑️ Removing favorite for media_id: {media_id}")
    favorite = db.query(Favorite).filter(Favorite.media_id == media_id).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Favorite not found")
    
    db.delete(favorite)
    db.commit()
    
    favorites = db.query(Favorite).all()
    return Favorites(favorites=[f.to_pydantic() for f in favorites])

@app.get("/favorites/is-favorite/{media_id}", response_model=bool)
def is_favorite(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"🔍 Checking if media_id {media_id} is favorited...")
    favorite = db.query(Favorite).filter(Favorite.media_id == media_id).first()
    return favorite is not None

@app.get("/favorites/length")
def get_favorites_length(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("📊 Getting favorites count...")
    count = db.query(Favorite).count()
    pages = (count + 19) // 20  # Ceiling division by 20
    return {"length": count, "pages": pages}

########## WATCHES ##########

@app.get("/watches", response_model=Watches)
def get_watches(
    page: int = Query(1, ge=1, description="Page number (1-indexed)"),
    limit: int = Query(20, ge=1, le=100, description="Number of items per page"),
    db: Session = Depends(get_db)
):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"📺 Getting watches - page {page}, limit {limit}...")
    
    # Calculate offset
    offset = (page - 1) * limit
    
    # Get paginated watches
    watches = db.query(Watch).offset(offset).limit(limit).all()
    return Watches(watches=[w.to_pydantic() for w in watches])

@app.post("/watches", response_model=Watches)
def add_watch(watch: WatchPydantic, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("🎬 Adding new watch...")
    # First check if media exists, create it if it doesn't
    media = db.query(Media).filter(Media.id == watch.media["id"]).first()
    if not media:
        print("📝 Media not found, creating new media entry...")
        # Create the media first
        new_media = Media(
            id=watch.media["id"],
            name=watch.media["name"],
            backdrop_path=watch.media.get("backdrop_path", ""),
            media_type=watch.media["media_type"]
        )
        db.add(new_media)
        db.commit()
        db.refresh(new_media)
        media = new_media
    
    # Check if watch already exists
    existing_watch = db.query(Watch).filter(Watch.media_id == media.id).first()
    if existing_watch:
        raise HTTPException(status_code=400, detail="Media already in watches")
    
    # Create new watch
    new_watch = Watch(media_id=media.id)
    db.add(new_watch)
    db.commit()
    db.refresh(new_watch)
    
    watches = db.query(Watch).all()
    return Watches(watches=[w.to_pydantic() for w in watches])

@app.delete("/watches/{media_id}", response_model=Watches)
def remove_watch(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"❌ Removing watch for media_id: {media_id}")
    watch = db.query(Watch).filter(Watch.media_id == media_id).first()
    if not watch:
        raise HTTPException(status_code=404, detail="Watch not found")
    
    db.delete(watch)
    db.commit()
    
    watches = db.query(Watch).all()
    return Watches(watches=[w.to_pydantic() for w in watches])

@app.get("/watches/is-watched/{media_id}", response_model=bool)
def is_watched(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"👀 Checking if media_id {media_id} is watched...")
    watch = db.query(Watch).filter(Watch.media_id == media_id).first()
    return watch is not None

@app.get("/watches/length")
def get_watches_length(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("📊 Getting watches count...")
    count = db.query(Watch).count()
    pages = (count + 19) // 20  # Ceiling division by 20
    return {"length": count, "pages": pages}

########## FRIENDS ##########

@app.get("/friends", response_model=Friends)
def get_friends(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("👥 Getting all friends...")
    friends = db.query(Friend).all()
    return Friends(friends=[f.to_pydantic() for f in friends])

@app.get("/friends/{friend_id}", response_model=FriendPydantic)
def get_friend(friend_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"👤 Getting friend with id: {friend_id}")
    friend = db.query(Friend).filter(Friend.id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    return friend.to_pydantic()

@app.post("/friends", response_model=Friends)
def add_friend(friend: FriendPydantic, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("➕ Adding new friend...")
    # Check if friend already exists
    existing_friend = db.query(Friend).filter(Friend.username == friend.username).first()
    if existing_friend:
        raise HTTPException(status_code=400, detail="Friend already exists")
    
    # Create new friend SQLAlchemy object
    new_friend = Friend(username=friend.username)
    db.add(new_friend)
    db.commit()
    db.refresh(new_friend)
    
    friends = db.query(Friend).all()
    return Friends(friends=[f.to_pydantic() for f in friends])

@app.delete("/friends/{friend_id}", response_model=Friends)
def remove_friend(friend_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"👋 Removing friend with id: {friend_id}")
    friend = db.query(Friend).filter(Friend.id == friend_id).first()
    if not friend:
        raise HTTPException(status_code=404, detail="Friend not found")
    
    db.delete(friend)
    db.commit()
    
    friends = db.query(Friend).all()
    return Friends(friends=[f.to_pydantic() for f in friends])

@app.get("/friends/length")
def get_friends_length(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("📊 Getting friends count...")
    count = db.query(Friend).count()
    pages = (count + 19) // 20  # Ceiling division by 20
    return {"length": count, "pages": pages}

########## MEDIA ##########

@app.get("/media", response_model=List[MediaPydantic])
def get_all_media(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("🎬 Getting all media...")
    media_list = db.query(Media).all()
    return [media.to_pydantic() for media in media_list]

@app.get("/media/{media_id}", response_model=MediaPydantic)
def get_media(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"🎬 Getting media with id: {media_id}")
    media = db.query(Media).filter(Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    return media.to_pydantic()

@app.post("/media", response_model=MediaPydantic)
def create_media(media: MediaPydantic, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("➕ Creating new media...")
    
    # Check if media already exists with the same ID
    existing_media = db.query(Media).filter(Media.id == media.id).first()
    if existing_media:
        # Update existing media
        existing_media.name = media.name
        existing_media.backdrop_path = media.backdrop_path
        existing_media.media_type = media.media_type
        db.commit()
        db.refresh(existing_media)
        return existing_media.to_pydantic()
    
    # Create new media
    new_media = Media(
        id=media.id,
        name=media.name,
        backdrop_path=media.backdrop_path,
        media_type=media.media_type
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    return new_media.to_pydantic()

@app.delete("/media/{media_id}")
def delete_media(media_id: int, db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print(f"🗑️ Deleting media with id: {media_id}")
    media = db.query(Media).filter(Media.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
    
    # Also delete related favorites and watches
    db.query(Favorite).filter(Favorite.media_id == media_id).delete()
    db.query(Watch).filter(Watch.media_id == media_id).delete()
    
    db.delete(media)
    db.commit()
    return {"message": "Media deleted successfully"}

@app.get("/media/length")
def get_media_length(db: Session = Depends(get_db)):
    if not DATABASE_CONNECTED:
        raise HTTPException(status_code=503, detail="Database connection unavailable")
    print("📊 Getting media count...")
    count = db.query(Media).count()
    pages = (count + 19) // 20  # Ceiling division by 20
    return {"length": count, "pages": pages}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
