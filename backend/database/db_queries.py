from database.db_connection import get_mongoDB_database

from datetime import datetime

"""
Returns all the Expenses for the given (year, month) pair divided by category.
"""
def get_expenses_by_interval(start_date: datetime, end_date: datetime):
    db = get_mongoDB_database()
    
    cursor = db["expenses"].find({
        "date" : {"$gte": start_date, "$lt": end_date}
    })

    return cursor