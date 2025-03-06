from http import HTTPStatus


OK = "", HTTPStatus.OK

BAD_REQUEST = {
    "message": "Missing information or invalid request!",
    "data": None,
    "error": "Bad Request"
}, HTTPStatus.BAD_REQUEST

UNAUTHORIZED = {
    "message": "Login failed!",
    "data": None,
    "error": "Unathorized"
}, HTTPStatus.UNAUTHORIZED

CONFLICT = {
    "message": "Resource already exists!",
    "data": None,
    "error": "Conflict"
}, HTTPStatus.CONFLICT

FORBIDDEN = {
    "message": "You can't access this information!",
    "data": None,
    "error": "Unathorized"
}, HTTPStatus.FORBIDDEN

NOT_FOUND = {
    "message": "Cannot find the requested resource!",
    "data": None,
    "error": "Not Found"
}, HTTPStatus.NOT_FOUND

MISSING_TOKEN = {
    "message": "Authentication Token is missing!",
    "data": None,
    "error": "Unauthorized"
}, HTTPStatus.UNAUTHORIZED

INVALID_TOKEN = {
    "message": "Invalid Authentication token!",
    "data": None,
    "error": "Unauthorized"
}, HTTPStatus.UNAUTHORIZED
