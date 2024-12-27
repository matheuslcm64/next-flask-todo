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

# Route to return the full list
@app.route('/tasks', methods=["GET"])
def get_list():
    data = load_data()
    #print(data)
    return jsonify(data)

# Route to delete a specific list item
@app.route('/delete/<uuid:id>', methods=["GET"])
def delete_item(id):
    print(id)
    # data[todo_list].pop(id)
    return jsonify({"message": "OK"})

# Route to update a specific list item
@app.route('/tasks/update/<id>', methods=["POST"])
def update_item(id):
    # data["todo_list"][id]= request.get_json()
    return jsonify({"message": "OK"})

@app.post("/save")
def save():
    data = load_data()
    new_data = store_data(data, request.get_json())
    #data["text"].append(request.get_json())
    #print(request.get_json())
    #print(data)
    return jsonify(new_data)

def load_data(file_path="data.json"):
    if not os.path.exists(file_path):
        default_data = {"todo_list": []}
        with open(file_path, "w") as file:
            json.dump(default_data, file)
            file.close()
    with open(file_path, "r") as file:
        data = json.load(file)
    return data


def verify_uuid(data, uuid):

    for i in range(len(data)):
        if data[i].get(uuid) != None:
            return True
    return False

def store_data(data, new_data):

    uuid_sample = str(uuid.uuid1())
    while(verify_uuid(data["todo_list"], uuid_sample)):
        uuid_sample = str(uuid.uuid1())
    # data["todo_list"][uuid_sample] = new_data["task"]
    data_uuid = {uuid_sample: new_data["task"]}
    data["todo_list"].append(data_uuid)
    print(new_data["task"])
    print(data)
    with open("data.json","w") as file:
        json.dump(data, file)
        #json.dump(file, {"todo_list": [d for d in json.load(file)["todo_list"]].append(new_data)})
        return data_uuid
    return None


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
