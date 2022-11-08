from typing import List

import api.cruds.user as user_crud
import api.schemas.user as user_schema
from api.db import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/", response_model=List[user_schema.User])
async def get_all_users(db: AsyncSession = Depends(get_db)):
    return await user_crud.get_all_users(db)


@router.get("/{user_id}", response_model=user_schema.User)
async def get_user(user_id: str, db: AsyncSession = Depends(get_db)):
    return await user_crud.get_user(db, user_id)
