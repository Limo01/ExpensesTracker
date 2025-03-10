from main import app
from flask import request

from constants.api_messages import OK, BAD_REQUEST

from database.db_connection import insert_mongoDB_document
from database.db_queries import get_incomes_by_interval, delete_income_by_id

from dateutil import parser

from data_models.income import Income

from json import dumps

from datetime import datetime

"""
Insert a new income inside the DB. The income has the following features 
(to be passed in the JSON):
 * Amount [required]: Income amount.
 * Date [optional]: Income date. If not provied, 'today' is used as default value.
 * Description [optional]: Optional income description.

"""
@app.route("/incomes", methods=["POST"])
def add_income():
    request_json = request.get_json()

    try:
        income = Income(**request_json)
    except:
        return BAD_REQUEST
    
    insert_mongoDB_document(collection_name="incomes", obj=income)

    return OK

"""
Get all the incomes for the given date interval.

Query field:
 * start_date [required]: Interval start date (inclusive)
 * end_date [optional]: Interval end date (exclusive)

"""
@app.route("/incomes", methods=["GET"])
def get_incomes():
    try:
        start_date = parser.parse(request.args.get("start_date"))
        end_date = parser.parse(request.args.get("end_date", default=str(datetime.today())))
    except:
        return BAD_REQUEST

    incomes = list(get_incomes_by_interval(start_date=start_date, end_date=end_date))

    return dumps(incomes, default=str)

"""
Delete an income from the database given its id.
"""
@app.route("/incomes/<income_id>", methods=["DELETE"])
def delete_income(income_id):
    try:
        delete_income_by_id(income_id)
    except:
        return BAD_REQUEST
    
    return OK
