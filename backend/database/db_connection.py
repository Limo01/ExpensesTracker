import pymongo

def get_mongoDB_database():
    client = pymongo.MongoClient("localhost", 27017)
    db = client.get_database("expensesTracker")
    
    return db

def insert_mongoDB_document(collection_name: str, obj: object):
    db = get_mongoDB_database()
    db[collection_name].insert_one(obj.__dict__)
