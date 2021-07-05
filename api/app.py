import helper
from flask import Flask, json, session, wrappers
from flask import jsonify, request
from flask_pymongo import PyMongo
from bson.json_util import dumps
from flask_cors import CORS
from datetime import datetime, timedelta
import pymongo
import jwt
from functools import wraps
from flask_mail import Mail, Message
from PIL import Image
from io import BytesIO
import base64
import os
import imghdr
import string
import random
import io


# For login functionality
import uuid
from passlib.hash import pbkdf2_sha256
from werkzeug.utils import redirect
from werkzeug.utils import secure_filename


app = Flask(__name__)
cors = CORS(app)
# /////////////////////////////////////////
# Importing the files required for AWS
S3_BUCKET = os.environ.get("S3_BUCKET_NAME")

app.config["S3_BUCKET"] = os.environ.get("S3_BUCKET_NAME")
app.config["S3_KEY"] = os.environ.get("S3_ACCESS_KEY")
app.config["S3_SECRET"] = os.environ.get("S3_SECRET_ACCESS_KEY")
app.config["S3_LOCATION"] = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)

# from helper import *
# ////////////////////////////////////////
app.secret_key = "thisismysecret"


app.config["MONGO_URI"] = "mongodb://localhost:27017/userDB"
# Connect mongodb database with the PyMongo Library
mongo = PyMongo(app)

client = pymongo.MongoClient('localhost', 27017)
db = client.userDB


# ///////////////////////////////////////////////////////////////////////////////////

# ///////////////////////////////////////////////////////////////////////////////////////
# Creating a decorator to secure our routes and verifying the JWT token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({"message": "Missing Token value"}), 403

        token = token.replace('Bearer ', '')
        try:
            data = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        except:
            return jsonify({"message": "Invalid Token value"}), 403

        return f(*args, **kwargs)

    return decorated


# ////////////////////////////////////////////////////////////////////////////////////////
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route for uploading files to S3 bucket
# @app.route("/uploadfile", methods = ["POST"])


def upload_file(binaryStringOfImage):

    if(binaryStringOfImage):
        decoded_string = base64.b64decode(binaryStringOfImage)
        im = Image.open(BytesIO(decoded_string))

        filename = str(''.join(random.choices(string.ascii_uppercase +
                                              string.digits, k=7)))
        # im.format gives the extension of the file
        filename = filename + "." + im.format

        in_mem_file = io.BytesIO()

        im.save(in_mem_file, format=im.format)
        in_mem_file.seek(0)

        content_type = "img/" + im.format.lower()

        if allowed_file(filename):
            filename = secure_filename(filename)
            output = helper.upload_file_to_s3(
                in_mem_file, filename, content_type, app.config["S3_BUCKET"])

            if output == "error":
                return "error"
            else:
                # Returning the s3 bucket image link
                return str(output)
        else:
            return "error"

# //////////////////////////////////////////////////////////////////////////////////////
# adding new user


@app.route('/add', methods=['POST'])
@token_required
def add_user():
    _json = request.json
    id = _json['userid']
    name = _json['name']
    email = _json['email']
    phone = _json['phone']
    address = _json['address']
    activityStatus = _json['activityStatus']

    # Checking for an existing email
    if db.users.find_one({"email": email}):
        return jsonify({"error": "email address already in use"}), 409
    # Checking for an existing user id
    if db.users.find_one({"userid": id}):
        return jsonify({"error": "User id already in use"}), 409

    # Validate the values
    if id and name and email and phone and address and request.method == 'POST':

        object = {
            'userid': id,
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
            'activityStatus': activityStatus
        }

        db.users.insert(object)
        resp = jsonify("User added successfully")
        resp.status_code = 200
        return resp

    else:
        return not_found()


# To get all the users
@app.route('/users', methods=["GET"])
@token_required
def get_all_users():
    users = db.users.find()
    resp = dumps(users)

    return resp

# To get activity status details


@app.route('/useractivity', methods=["GET"])
@token_required
def getUserActivity():
    users = db.users.find()
    activeUser_count = 0
    inactiveUser_count = 0

    for user in users:
        if(user["activityStatus"] == "Yes"):
            activeUser_count += 1
        elif(user['activityStatus'] == "No"):
            inactiveUser_count += 1

    return jsonify({"active": activeUser_count, "inactive": inactiveUser_count}), 200


# To get a user by his/her id
@app.route('/users/<userid>', methods=["GET"])
@token_required
def get_user(userid):

    user = db.users.find_one({"userid": userid})

    if user["password"]:
        del user["password"]

    if(user == None):
        resp = jsonify("User not found")
    else:
        resp = dumps(user)

    return resp

# To delete a user by his/her id


@app.route('/delete/<userid>', methods=["DELETE"])
def delete_user(userid):

    result = db.users.delete_one({"userid": userid})

    if(result.deleted_count == 0):
        resp = jsonify("User does not exist")
        resp.status_code = 404
    else:
        resp = jsonify("User deleted successfully")
        resp.status_code = 200

    return resp

# Update the user


@app.route('/update/<id>', methods=["PUT"])
@token_required
def update_user(id):
    _json = request.json

    userimage_link = None

    if "userimage" in _json:
        if _json["userimage"] != None:
            userimage = _json["userimage"]
            userimage = userimage[0:4:1]

            if userimage == "http":
                userimage_link = _json["userimage"]
            else:
                #    Upload file to aws
                userimage_link = upload_file(_json["userimage"])
                if userimage_link == "error":
                    userimage_link = 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'

    userid = _json['userid']
    name = _json['name']
    email = _json['email']
    phone = _json['phone']
    address = _json['address']
    activityStatus = _json['activityStatus']

    # Checking for an existing email
    db_obj = db.users.find_one({"email": email})

    if db_obj and db_obj["userid"] != userid:
        # print("email already in use")
        return jsonify({"error": "Email address already in use"}), 409

    if userid and name and email and phone and address and request.method == 'PUT':
        object = {
            'userid': userid,
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
            'activityStatus': activityStatus,
            'userimage_link': userimage_link
        }

        query = {"userid": id}

        result = db.users.update_one(
            query,
            {"$set": object}
        )

        if(result.matched_count == 0):
            resp = jsonify("User does not exist! Can't Update")
            resp.status_code = 404
        else:
            resp = jsonify("User updated successfully")
            resp.status_code = 200

        return resp

    else:
        return not_found()

# //////////////////////////////////////////////////////////////////////////////////////

# Signup


@app.route('/admin/signup', methods=["POST"])
def admin_signup():

    _json = request.json
    email = _json["email"]
    password = _json["password"]

    # Creating the admin object
    admin = {
        "_id": uuid.uuid4().hex,
        "email": email,
        "password": password
    }
    # Password encyption
    admin["password"] = pbkdf2_sha256.encrypt(admin["password"])

    # Checking for an existing email
    if db.admins.find_one({"email": admin["email"]}):
        return jsonify({"error": "email address already in use"}), 400

    # Saving to the collection "admins"
    if db.admins.insert_one(admin):
        return jsonify(admin), 200

    return jsonify({"error": "Signup failed"}), 400


@app.route('/user/signup', methods=["PUT"])
def user_signup():
    # We will first check if the user is present in the "users" collection
    # If no, give a prompt that user does not exist
    # If the user is present in the collection, update that particular record, by giving it a password

    _json = request.json
    email = _json["email"]
    password = _json["password"]

    # Checking whether the mail exists or not
    if db.users.find_one({"email": email}):
        # Email address exists
        # return jsonify({"message": "user exist !!!"}), 200

        # Creating the user object
        user = {
            "password": password
        }
        # Password encyption
        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        # Updating to the collection "users"
        if email and password and request.method == 'PUT':

            query = {"email": email}
            result = db.users.update_one(
                query,
                {"$set": {
                    "password": user["password"]
                }}
            )

            if(result.matched_count != 0):
                resp = jsonify({"message": "User signup successful !!!"})
                resp.status_code = 200
            else:
                resp = jsonify({"error": "User Signup failed !!!"})
                resp.status_code = 400

            return resp

        else:
            return jsonify({"error": "All fields compulsory"}), 400

    return jsonify({"error": "User does not exist !!!"}), 404


@app.route('/admin/login', methods=["POST"])
def admin_login():
    _json = request.json
    # Finding the provided email in the database
    admin = db.admins.find_one({
        "email": _json["email"]
    })

    # admin["password"] is the encrypted password present in the database
    if admin and pbkdf2_sha256.verify(_json["password"], admin["password"]):
        del admin["password"]

        # Creating the jwt token
        token = jwt.encode({
            'user': admin["email"],
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.secret_key, 'HS256')

        resp = jsonify({"token": token, "email": admin["email"]})
        return resp, 200

    return jsonify({"error": "Invalid Login credentials"}), 401


@app.route('/user/login', methods=["POST"])
def user_login():
    _json = request.json
    # Finding the provided email in the "users" collection
    user = db.users.find_one({
        "email": _json["email"]
    })

    # user["password"] is the encrypted password present in the database
    if user and pbkdf2_sha256.verify(_json["password"], user["password"]):
        del user["password"]

        # Creating the jwt token
        token = jwt.encode({
            'user': user["email"],
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, app.secret_key, 'HS256')

        resp = jsonify(
            {"token": token,
                "userid": user["userid"],
                "name": user["name"],
                "email": user["email"],
                "phone": user["phone"],
                "address": user["address"],
                'activityStatus': user["activityStatus"]
             })
        return resp, 200

    return jsonify({"error": "Invalid Login credentials"}), 401
# //////////////////////////////////////////////////////////////////////////////////////


# Sending Mail
mail = Mail(app)  # instantiate the mail class

# configuration of mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route("/send-mail/<email>", methods=["GET"])
def sendMail(email):
    msg = Message(
        'Hello',
        sender='manik071299@gmail.com',
        recipients=[email]
    )
    msg.body = 'This is an email sent from the Ficode Team'
    mail.send(msg)
    return jsonify({"message": "email sent"}), 200
# /////////////////////////////////////////////////////////////////////////////////////


@app.errorhandler(404)
def not_found(error=None):
    msg = {
        'status': 404,
        'message': 'ERROR !!! Page Not Found - ' + request.url
    }
    resp = jsonify(msg)
    resp.status_code = 404
    return resp


if __name__ == "__main__":
    app.run(debug=True)
