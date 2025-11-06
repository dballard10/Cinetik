from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel
from typing import List

class Friend(Base):
    __tablename__ = "friends"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)

    def to_pydantic(self):
        return FriendPydantic(id=self.id, username=self.username)

class FriendPydantic(BaseModel):
    id: int
    username: str

class Friends(BaseModel):
    friends: List[FriendPydantic]