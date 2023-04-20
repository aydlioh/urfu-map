# База данных со всеми кабинетами
from backend.database_part.bases.db_session import SqlAlchemyBase
import sqlalchemy
from sqlalchemy import orm


class Cabinets(SqlAlchemyBase):
    """
    Класс Cabinets моделирует базу данных всех кабинетов.

    Каждый кабинет группируется в базе по принадлежности к институту и по этажу, на котором он находится
    """
    __tablename__ = 'cabinets'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String, unique=True)
    # Каждый кабинет связан с id института (из базы institutes), к которому он относится
    institute_id = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey('institutes.id'))
    # Этаж, на котором находится кабинет
    floor_number = sqlalchemy.Column(sqlalchemy.Integer)
    # Описание кабинета (в будущем может быть удалено)
    description = sqlalchemy.Column(sqlalchemy.String)

    institute = orm.relation('institute')

    def __repr__(self):
        # Для вывода объекта на печать с помощью команды print
        info = f'''
id - {self.id}
Кабинет - {self.name}
ID института - {self.institute_id}
Этаж - {self.floor_number}
Описание - {self.description}
'''
        return info
