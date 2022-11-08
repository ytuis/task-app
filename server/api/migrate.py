from api.models.task import Base as TaskBase
from api.models.user import Base as UserBase
from sqlalchemy import create_engine

DB_URL = "mysql+pymysql://root@db:3306/demo?charset=utf8"
engine = create_engine(DB_URL, echo=True)


def reset_database():
    UserBase.metadata.drop_all(bind=engine)
    UserBase.metadata.create_all(bind=engine)
    TaskBase.metadata.drop_all(bind=engine)
    TaskBase.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
