from datetime import datetime
from dateutil import parser

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
                 date: datetime=datetime.today(),
                 description: str=None):
        self.category = category
        self.amount = amount
        self.date = Expense.parse_date(date)

        if description is not None:
            self.description = description
    
    def parse_date(date: object) -> datetime:
        if not isinstance(date, datetime):
            return parser.parse(date)
        return date
    