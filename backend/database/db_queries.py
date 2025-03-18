from database.db_connection import get_mongoDB_database

from bson import ObjectId

from datetime import datetime

"""
Returns all the Expenses for the given interval (start_date inclusive, end_date exclusive).
"""
def get_expenses_by_interval(start_date: datetime, end_date: datetime):
    db = get_mongoDB_database()
    
    cursor = db["expenses"].find({
        "date" : {"$gte": start_date, "$lt": end_date}
    }).sort({"date" : 1})

    return cursor

"""
Delete an expense from the database given its id.
"""
def delete_expense_by_id(expense_id: str):
    db = get_mongoDB_database()
    
    db["expenses"].delete_one({"_id": ObjectId(expense_id)})

"""
Returns all the Incomes for the given interval (start_date inclusive, end_date exclusive).
"""
def get_incomes_by_interval(start_date: datetime, end_date: datetime):
    db = get_mongoDB_database()
    
    cursor = db["incomes"].find({
        "date" : {"$gte": start_date, "$lt": end_date}
    }).sort({"date" : 1})

    return cursor

"""
Delete an income from the database given its id.
"""
def delete_income_by_id(income_id: str):
    db = get_mongoDB_database()
    
    db["incomes"].delete_one({"_id": ObjectId(income_id)})
