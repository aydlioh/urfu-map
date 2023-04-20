# База данных со всеми институтами
from backend.database_part.bases.db_session import SqlAlchemyBase
import sqlalchemy
from sqlalchemy import orm


class Institutes(SqlAlchemyBase):
    """
    Класс Institutes моделирует базу даннных всех институтов УрФУ.
    """
    __tablename__ = 'institutes'

    # Идентификатор института, по которому происходит связь института с кабинетами из базы cabinets
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String, unique=True)
    # Количество этажей в институте
    number_of_floors = sqlalchemy.Column(sqlalchemy.Integer)
    description = sqlalchemy.Column(sqlalchemy.String)

    cabinets = orm.relation('cabinets', back_populates='institute')

    def __repr__(self):
        # Для вывода объекта на печать с помощью команды print
        info = f'''
id - {self.id}
Институт - {self.name}
Количество этажей - {self.number_of_floors}
Описание - {self.description}
'''
        return info
