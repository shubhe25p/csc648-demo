from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.sql import text
import json
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

class Base(DeclarativeBase):
  pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URL')
db.init_app(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(100), nullable=False)

    def as_dict(self):
        return {'id': self.id, 'item': self.item}

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/check')
def check_db_connection():
    try:
        # Attempt to execute a simple database query to check the connection
        db.session.execute(text('SELECT 1'))
        return 'Connected to the database!'
    except Exception as e:
        return f'Failed to connect to the database: {str(e)}'
    
@app.route('/add', methods=['POST'])
def addTodo():
    data = request.get_json()
    test = Todo(item=data['item'])
    db.session.add(test)
    db.session.commit()
    return 'Added a new todo!'

@app.route('/getall')
def getTodo():
    alltodo = Todo.query.all()
    return json.dumps([todo.as_dict() for todo in alltodo])

with app.app_context():
    db.create_all()
    if (len(Todo.query.all()) > 0):
        db.session.query(Todo).delete()
        db.session.commit()
        print("Table emptied successfully!")


if __name__ == '__main__':
    app.run()
