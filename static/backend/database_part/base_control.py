# Менеджер баз данных
from .bases import *

# TODO: оптимизировать код
# TODO: добавить в базу данных изображения планировок институтов для просмотра на сайте


class Controller:
    """
    Класс Controller является "менеджером" всех баз данных
    """
    def __init__(self):
        self.sess = get_session()

    def get_institutes(self):
        """
        Выдает все институты, доступные для просмотра
        :return: Данные из базы данных Institutes
        """

        institutes = self.sess.query(Institutes).all()
        return institutes

    def get_institute_cabinets(self, institute_id, floor_number):
        """
        Выдает все кабинеты, расположенные в определенном институте на определенном этаже
        :param institute_id: Идентификатор института
        :param floor_number: Номер этажа
        :return: Кабинеты, подходящие по параметрам
        """
        cabinets = self.sess.query(Cabinets).get({'institute_id': institute_id, 'floor_number': floor_number})
        return cabinets
