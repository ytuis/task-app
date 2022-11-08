from typing import List, Optional

from pydantic import BaseModel, Field


class Comment(BaseModel):
    id: int
    content: str = Field(None, description="コメント内容", example="さつまいもの特売")
    task_id: int = Field(None, description="タスク番号")

    class Config:
        orm_mode = True


class CommentCreateRequest(BaseModel):
    content: str = Field(None, description="コメント内容", example="さつまいもの特売")
    task_id: int = Field(..., description="タスク番号", example=1)

    class Config:
        orm_mode = True


class CommentCreateResponse(CommentCreateRequest):
    id: int

    class Config:
        orm_mode = True


class Task(BaseModel):
    id: int
    title: str = Field(None, description="タイトル", example="プログラミングの学習")
    comments: Optional[List[Comment]]
    user_id: str

    class Config:
        orm_mode = True


class TaskCreateRequest(BaseModel):
    title: str = Field(None, description="タイトル", example="Programing")
    comments: Optional[List[str]] = Field(
        None, description="コメント", example=["Python", "Java"]
    )
    user_id: str

    class Config:
        orm_mode = True


class TaskCreateResponse(TaskCreateRequest):
    id: int

    class Config:
        orm_mode = True


class TaskUpdateRequest(BaseModel):
    title: str = Field(None, description="タイトル", example="お買い物")
    comments: Optional[List[str]] = Field(
        None, description="コメント", example=["玉ねぎ", "にんじん"]
    )

    class Config:
        orm_mode = True
