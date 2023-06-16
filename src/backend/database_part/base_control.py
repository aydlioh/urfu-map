# Менеджер баз данных
from sosw_map_master.src.backend.database_part.bases import *

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
