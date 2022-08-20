"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    """
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException


#Create flask app
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/register", methods = ["POST"])
def register():

    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the email', status_code=400)

    # at this point, all data has been validated, we can proceed to inster into the bd
    newUser = User(email=body['email'], password=body['password'], is_active = True)
    db.session.add(newUser)
    db.session.commit()
    return jsonify("Usuario creado, mensaje del backend"), 200

@api.route("/login", methods =["POST"])
def login():
    body = request.get_json()
    
    if body is None:
        raise APIException("You need to specify the request body as a json object", status_code=400)
    if 'email' not in body:
        raise APIException('You need to specify the username', status_code=400)
    if 'password' not in body:
        raise APIException('You need to specify the email', status_code=400)

    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email = email, password = password).first()
    print (user)
    if not user:
        return jsonify("Credenciales incorrectas"), 401

    access_token = create_access_token(identity = email)

    return jsonify({
        "email": email,
        "token": access_token
    })