from main import app
from flask import request

from constants.api_messages import OK, BAD_REQUEST

from database.db_connection import insert_mongoDB_document
from database.db_queries import get_expenses_by_interval, delete_expense_by_id

from dateutil import parser

from data_models.expense import Expense
from collections import defaultdict

from json import dumps

from datetime import datetime

"""
Insert a new expense inside the DB. The expense has the following features 
(to be passed in the JSON):
 * Category [required]: Expense category.
 * Amount [required]: Expense amount.
 * Date [optional]: Expense date. If not provied, 'today' is used as default value.
 * Description [optional]: Optional expense description.

"""
@app.route("/expenses", methods=["POST"])
def add_expense():
    request_json = request.get_json()

    try:
        expense = Expense(**request_json)
    except:
        return BAD_REQUEST
    
    insert_mongoDB_document(collection_name="expenses", obj=expense)

    return OK

"""
Get all the expenses divided by category for the given date interval.

Query field:
 * start_date [required]: Interval start date (inclusive)
 * end_date [optional]: Interval end date (exclusive)

"""
@app.route("/expenses", methods=["GET"])
def get_expenses():
    try:
        start_date = parser.parse(request.args.get("start_date"))
        end_date = parser.parse(request.args.get("end_date", default=str(datetime.today())))
    except:
        return BAD_REQUEST

    cursor = get_expenses_by_interval(start_date=start_date, end_date=end_date)

    expenses_by_category = defaultdict(list)

    for expense in cursor:
        expenses_by_category[expense["category"]].append(expense)

    return dumps(expenses_by_category, default=str)

"""
Delete an expense from the database given its id.
"""
@app.route("/expenses/<expense_id>", methods=["DELETE"])
def delete_expense(expense_id):
    try:
        delete_expense_by_id(expense_id)
    except:
        return BAD_REQUEST
    
    return OK
