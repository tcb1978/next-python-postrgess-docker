from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
db = SQLAlchemy(app)

class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), unique=True, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)

  def json(self):
    return {'id': self.id,'name': self.name, 'email': self.email}

db.create_all()

# create a test route
@app.route('/test', methods=['GET'])
def test():
  return jsonify({'message': 'The server is running'})

# create a user
@app.route('/api/flask/users', methods=['POST'])
def create_user():
  try:
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email
    }), 201

  except Exception as e:
    return make_response(jsonify({'message': 'error creating user', 'error': str(e)}), 500)

# get all users
@app.route('/api/flask/users', methods=['GET'])
def get_users():
  try:
    users = User.query.all()
    users_data = [{'id': user.id, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(users_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'error getting users', 'error': str(e)}), 500)

# get a user by id
@app.route('/api/flask/users/<id>', methods=['GET'])
def get_user(id):
  try:
    user = User.query.filter_by(id=id).first() # get the first user with the id
    if user:
      return make_response(jsonify({'user': user.json()}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'error getting user', 'error': str(e)}), 500)

# update a user by id
@app.route('/api/flask/users/<id>', methods=['PUT'])
def update_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      data = request.get_json()
      user.name = data['name']
      user.email = data['email']
      db.session.commit()
      return make_response(jsonify({'message': 'user updated'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)
  except Exception as e:
      return make_response(jsonify({'message': 'error updating user', 'error': str(e)}), 500)

# delete a user by id
@app.route('/api/flask/users/<id>', methods=['DELETE'])
def delete_user(id):
  try:
    user = User.query.filter_by(id=id).first()
    if user:
      db.session.delete(user)
      db.session.commit()
      return make_response(jsonify({'message': 'user deleted'}), 200)
    return make_response(jsonify({'message': 'user not found'}), 404)
  except Exception as e:
    return make_response(jsonify({'message': 'error deleting user', 'error': str(e)}), 500)

# Create route to return dictionary for displaying language
@app.route('/api/flask/language', methods=['GET'])
def get_language():
  try:
    language = [
      {
        "createUser": {
          "heading": {
            "create": "Create User",
            "edit": "Edit User",
          },
          "formElements": {
            "name": {
              "label": "Name",
              "type": "text",
              "description": "Enter your name",
              "required": True
            },
            "email": {
              "label": "Email",
              "type": "email",
              "description": "Enter your email",
              "required": True
            }
          },
          "callToActions": "Create User",
        },
        "users": {
          "heading": "Users",
          "callToActions": {
            "edit": "Edit",
            "delete": "Delete",
          },
          "confirmation": {
            "alertDialogTitle": "Are you sure you want to delete this user?",
            "alertDialogDescription": "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
            "alertDialogCancel": "Cancel",
            "alertDialogAction": "Continue",
          }
        },
        "dataShape": {
          "heading": "Users JSON"
        },
        "noUsersFound": "No users found. Add a new user to get started."
      }
    ]
    return make_response(jsonify(language), 200)
  except Exception as e:
    return make_response(jsonify({'message': 'error getting language', 'error': str(e)}), 500)