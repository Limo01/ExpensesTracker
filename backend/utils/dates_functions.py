from datetime import datetime
from dateutil import parser

def parse_date(date: object) -> datetime:
    if not isinstance(date, datetime):
        return parser.parse(date)
    return date