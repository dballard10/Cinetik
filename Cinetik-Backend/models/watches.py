from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel
from typing import List
from models.media import Media

class Watch(Base):
    __tablename__ = "watches"

    id = Column(Integer, primary_key=True)
    media_id = Column(Integer, ForeignKey("media.id"), nullable=False)
    media = relationship("Media")

    def to_pydantic(self):
        return WatchPydantic(media=self.media.to_pydantic().dict())

class WatchPydantic(BaseModel):
    media: dict

class Watches(BaseModel):
    watches: List[WatchPydantic]