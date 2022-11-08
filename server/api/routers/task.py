from typing import List

import api.cruds.task as task_crud
import api.schemas.task as task_schema
from api.db import get_db
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/task", tags=["task"])


@router.get("/comment", response_model=List[task_schema.Comment])
async def get_all_comments(db: AsyncSession = Depends(get_db)):
    return await task_crud.get_all_comments(db)


@router.get("/comment/{id}", response_model=task_schema.Comment)
async def get_comment(id: int, db: AsyncSession = Depends(get_db)):
    return await task_crud.get_comment(db, id)


@router.post("/comment/", response_model=task_schema.Comment)
async def create_comment(
    body: task_schema.CommentCreateRequest, db: AsyncSession = Depends(get_db)
):
    return await task_crud.create_comment(db, body)


@router.delete("/comment/{id}", response_model=None)
async def delete_comment(
    id: int,
    db: AsyncSession = Depends(get_db),
):
    comment = await task_crud.get_comment_obj(db, id=id)
    if comment is None:
        raise HTTPException(status_code=404, detail="comment not found")
    return await task_crud.delete_comment(db, original=comment)


@router.get("/", response_model=List[task_schema.Task])
async def get_all_tasks(db: AsyncSession = Depends(get_db)):
    return await task_crud.get_all_tasks(db)


@router.get("/user/{user_id}", response_model=List[task_schema.Task])
async def get_all_tasks_filter_by_user(
    user_id: str, db: AsyncSession = Depends(get_db)
):
    return await task_crud.get_all_tasks_filter_by_user(db, user_id)


@router.get("/{id}", response_model=task_schema.Task)
async def get_task(id: int, db: AsyncSession = Depends(get_db)):
    return await task_crud.get_task(db, id)


@router.post("/", response_model=int)
async def create_task(
    body: task_schema.TaskCreateRequest, db: AsyncSession = Depends(get_db)
):
    return await task_crud.create_task(db, body)


@router.put("/{id}", response_model=int)
async def update_task(
    id: int,
    body: task_schema.TaskUpdateRequest,
    db: AsyncSession = Depends(get_db),
):
    task = await task_crud.get_task(db, id=id)
    if task is None:
        raise HTTPException(status_code=404, detail="task not found")
    return await task_crud.update_task(db, body, original=task)


@router.delete("/{id}", response_model=None)
async def delete_task(
    id: int,
    db: AsyncSession = Depends(get_db),
):
    task = await task_crud.get_task_obj(db, id=id)
    if task is None:
        raise HTTPException(status_code=404, detail="task not found")
    return await task_crud.delete_task(db, original=task)
