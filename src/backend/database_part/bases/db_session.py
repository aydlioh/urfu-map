# Программа для инициализации orm-базы
import sqlalchemy as sq
from sqlalchemy import orm
from sqlalchemy.orm import Session
from sqlalchemy.ext.declarative import declarative_base

SqlAlchemyBase = declarative_base()
__factory = None


def global_init(path):
    global __factory
    if __factory:
        return

    base_path = f'sqlite:///{path}?check_same_thread=False'
    eng = sq.create_engine(base_path, echo=False)

    __factory = orm.sessionmaker(bind=eng)

    from . import models
    SqlAlchemyBase.metadata.create_all(eng)


def get_session() -> Session:
    return __factory()
