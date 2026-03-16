from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel
from typing import List

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True)
    media_id = Column(Integer, ForeignKey("media.id"), nullable=False)
    media = relationship("Media")

    def to_pydantic(self):
        return FavoritePydantic(media=self.media.to_pydantic().dict())

class FavoritePydantic(BaseModel):
    media: dict

class Favorites(BaseModel):
    favorites: List[FavoritePydantic]
