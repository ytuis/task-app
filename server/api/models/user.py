from api.db import Base
from sqlalchemy import Column, DateTime, String
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "User"

    id = Column(String(255), primary_key=True)
    name = Column(String(255))
    email = Column(String(255))
    emailVerified = Column(DateTime)
    image = Column(String(255))

    tasks = relationship("Task", cascade="all,delete", backref="user")
