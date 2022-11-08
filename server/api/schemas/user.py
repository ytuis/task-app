from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class User(BaseModel):
    id: str
    name: Optional[str] = Field(None, description="user name", example="yamada taro")
    email: Optional[str] = Field(
        None, description="user email", example="yamada.taro@hoge.hoge"
    )
    emailVerified: Optional[datetime]
    image: Optional[str] = Field(None, description="user image", example="https://...")

    class Config:
        orm_mode = True
