from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    backdrop_path = Column(String)
    media_type = Column(String, nullable=False)

    def to_pydantic(self):
        return MediaPydantic(
            id=self.id,
            name=self.name,
            backdrop_path=self.backdrop_path,
            media_type=self.media_type
        )

class MediaPydantic(BaseModel):
    id: int
    name: str
    backdrop_path: str
    media_type: str