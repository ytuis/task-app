import logging
from typing import List, Optional, Tuple

import api.models.user as user_model
from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

logging.basicConfig(level=logging.INFO)
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


async def get_all_users(db: AsyncSession) -> List[user_model.User]:
    result: Result = await db.execute(select(user_model.User))
    return result.all()


async def get_user(db: AsyncSession, user_id: str) -> Optional[user_model.User]:
    result: Result = await db.execute(
        select(user_model.User).filter(user_model.User.id == user_id)
    )
    user: Optional[Tuple[user_model.User]] = result.first()
    return user[0] if user is not None else None
