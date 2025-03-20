from datetime import datetime, time
from utils.dates_functions import parse_date

"""
Expense fields:
 * category [required]
 * amount [required]
 * date [optional]
 * description [optional]
"""
class Expense(object):
    def __init__(self, 
                 category: str, 
                 amount: float, 
                 date: datetime=datetime.combine(datetime.today(), time.min),
                 description: str=None):
        self.category = category
        self.amount = amount
        self.date = parse_date(date)

        if description is not None:
            self.description = description
