from email.policy import default
from fileinput import filename
import json
from pickle import GET
from urllib import response
from flask import Flask, url_for, render_template
from markupsafe import escape
from pathlib import Path
import uuid
from flask import request
from flask import jsonify
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# @app.route('/path/')
# def hello():
#     return f"Hello"
# @app.route('/path/<uuid:x>')
# def hello_uuid(x):
#     return f"Hello {x}"

@app.route('/hello')
@app.route('/hello/<name>')
def index(name=None):
    print(request.args)
    # print(request.args.get("key",""))
    return render_template('hello.html', person=name)

@app.post("/save")
def save():
    data = load_data()
    store_data(data, request.get_json())
    #data["text"].append(request.get_json())
    #print(request.get_json())
    #print(data)
    return jsonify({"message": "OK"})

def load_data(file_path="data.json"):
    default_data = {"todo_list": []}
    if not os.path.exists(file_path):
        with open(file_path, "w") as file:
            json.dump(default_data, file)
            file.close()
    with open(file_path, "r") as file:
        data = json.load(file)
    return data

def store_data(data, new_data):
    data["todo_list"].append(new_data)
    with open("data.json","w") as file:
        json.dump(data, file)
        #json.dump(file, {"todo_list": [d for d in json.load(file)["todo_list"]].append(new_data)})
        return True
    return False


# with app.test_client() as client:
#     client.get("/hello?arg1=xyz&arg2=abc&arg3=123")
    # response = client.get("/hello")
    # print(response.get_data(as_text=True))
    # response = client.get("/hello/Matheus")
    # print(response.get_data(as_text=True))

# with app.test_request_context():
    # print(url_for("index", name="", arg1="xyz"))
#     print(url_for("hello"))
#     print(url_for("hello_uuid", x=uuid.uuid1(), next="/", op="ok"))
#     print(url_for('static', filename="main-header-background.module.css"))
    


# def route(self):
#     # Whatever
#     self.hello()
#     # Whatever
