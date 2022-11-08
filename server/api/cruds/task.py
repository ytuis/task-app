import logging
from typing import List, Optional, Tuple

import api.models.task as task_model
import api.schemas.task as task_schema
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

logging.basicConfig(level=logging.INFO)
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


async def get_all_tasks(
    db: AsyncSession,
) -> List[task_model.Task]:
    q_task = select(task_model.Task.id, task_model.Task.title, task_model.Task.user_id)
    r_task: Result = await (db.execute(q_task))

    q_comment = select(
        task_model.Comment.id,
        task_model.Comment.content,
        task_model.Comment.task_id,
    )
    r_commen: Result = await (db.execute(q_comment))

    comments = [task_model.Comment(**c) for c in r_commen.all()]

    tasks = []
    for t in r_task.all():
        task = task_model.Task(**t)

        for comment in [c for c in comments if c.task_id == task.id]:
            task.comments.append(comment)
        tasks.append(task)

    return tasks


async def get_all_tasks_filter_by_user(
    db: AsyncSession, user_id: int
) -> List[task_model.Task]:
    q_task = select(
        task_model.Task.id, task_model.Task.title, task_model.Task.user_id
    ).filter(task_model.Task.user_id == user_id)
    r_task: Result = await (db.execute(q_task))

    q_comment = select(
        task_model.Comment.id,
        task_model.Comment.content,
        task_model.Comment.task_id,
    )
    r_commen: Result = await (db.execute(q_comment))

    comments = [task_model.Comment(**c) for c in r_commen.all()]

    tasks = []
    for t in r_task.all():
        task = task_model.Task(**t)

        for comment in [c for c in comments if c.task_id == task.id]:
            task.comments.append(comment)
        tasks.append(task)

    return tasks


async def get_task(db: AsyncSession, id: int) -> Optional[task_model.Task]:
    q_task = select(
        task_model.Task.id,
        task_model.Task.title,
    ).filter(task_model.Task.id == id)
    r_task: Result = await db.execute(q_task)

    t = r_task.first()
    if t is None:
        return None
    task = task_model.Task(**t)

    q_comment = select(
        task_model.Comment.id,
        task_model.Comment.content,
        task_model.Comment.task_id,
    ).filter(task_model.Comment.task_id == id)
    r_commen: Result = await db.execute(q_comment)

    comments = [task_model.Comment(**c) for c in r_commen.all()]

    for comment in comments:
        task.comments.append(comment)

    return task


async def get_task_obj(db: AsyncSession, id: int) -> Optional[task_model.Task]:
    result: Result = await db.execute(
        select(task_model.Task).filter(task_model.Task.id == id)
    )
    task: Optional[Tuple[task_model.Task]] = result.first()
    return task[0] if task is not None else None


async def create_task(
    db: AsyncSession, task_create: task_schema.TaskCreateRequest
) -> int:
    task = task_model.Task(title=task_create.title, user_id=task_create.user_id)

    if task_create.comments is not None:
        for c in task_create.comments:
            comment = task_model.Comment(content=c)
            task.comments.append(comment)

    db.add(task)
    await db.commit()
    await db.refresh(task)

    return task.id


async def update_task(
    db: AsyncSession,
    task_create: task_schema.TaskCreateRequest,
    original: task_model.Task,
) -> int:
    if task_create.title is not None:
        original.title = task_create.title

    if task_create.comments is not None:
        comments = [task_model.Comment(content=c) for c in task_create.comments]

        for comment in comments:
            original.comments.append(comment)

    await db.merge(original)
    await db.commit()

    return original.id


async def delete_task(db: AsyncSession, original: task_model.Task) -> None:
    await db.delete(original)
    await db.commit()


async def get_all_comments(
    db: AsyncSession,
) -> List[task_model.Comment]:
    result: Result = await (
        db.execute(
            select(
                task_model.Comment.id,
                task_model.Comment.content,
                task_model.Comment.task_id,
            )
        )
    )

    return result.all()


async def get_comment(db: AsyncSession, id: int) -> Optional[task_model.Comment]:
    result: Result = await (
        db.execute(
            select(
                task_model.Comment.id,
                task_model.Comment.content,
                task_model.Comment.task_id,
            ).filter(task_model.Comment.id == id)
        )
    )
    comment: Optional[task_model.Comment] = result.first()
    return comment if comment is not None else None


async def get_comment_obj(db: AsyncSession, id: int) -> Optional[task_model.Task]:
    result: Result = await db.execute(
        select(task_model.Comment).filter(task_model.Comment.id == id)
    )
    comment: Optional[Tuple[task_model.Comment]] = result.first()
    return comment[0] if comment is not None else None


async def create_comment(
    db: AsyncSession, task_create: task_schema.CommentCreateRequest
) -> task_model.Comment:
    comment = task_model.Comment(**task_create.dict())

    db.add(comment)
    await db.commit()
    await db.refresh(comment)
    return comment


async def delete_comment(db: AsyncSession, original: task_model.Comment) -> None:
    await db.delete(original)
    await db.commit()
