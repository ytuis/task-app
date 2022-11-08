from api.db import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    comments = relationship("Comment", cascade="all,delete", backref="task")

    user_id = Column(
        String(255), ForeignKey("User.id", ondelete="CASCADE"), nullable=False
    )


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True)
    content = Column(String(255))

    task_id = Column(
        Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False
    )
