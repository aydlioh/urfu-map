# База данных со всеми институтами
from .db_session import SqlAlchemyBase
import sqlalchemy
from sqlalchemy_serializer import SerializerMixin


class Institutes(SqlAlchemyBase, SerializerMixin):
    """
    Класс Institutes моделирует базу даннных всех институтов УрФУ.
    """
    __tablename__ = 'institutes'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)  # Идентификатор
    color = sqlalchemy.Column(sqlalchemy.Text)  # Цвет маркера
    title = sqlalchemy.Column(sqlalchemy.Text, unique=True)  # Название института
    position = sqlalchemy.Column(sqlalchemy.Text)  # Позиция на карте
    door = sqlalchemy.Column(sqlalchemy.Text)  # Позиция двери на карте
    text = sqlalchemy.Column(sqlalchemy.Text)  # Описание института
    groundFloor = sqlalchemy.Column(sqlalchemy.Integer)  # Имеется ли подземный этаж
    institute = sqlalchemy.Column(sqlalchemy.Integer)  # Количество изображений этажей
