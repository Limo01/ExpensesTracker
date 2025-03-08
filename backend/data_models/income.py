from datetime import datetime, time
from utils.dates_functions import parse_date

"""
Income fields:
 * amount [required]
 * date [optional]
 * description [optional]
"""
class Income(object):
    def __init__(self, 
                 amount: float, 
                 date: datetime=datetime.combine(datetime.today(), time.min),
                 description: str=None):
        self.amount = amount
        self.date = parse_date(date)

        if description is not None:
            self.description = description
    