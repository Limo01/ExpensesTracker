from main import app
from flask import request

from constants.api_messages import OK, BAD_REQUEST

from database.db_connection import insert_mongoDB_document

from data_models.income import Income

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
