import json
from flask import Flask
import uuid
from flask import request
from flask import jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
api = Api(app)

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
    data_uuid = {uuid_sample: new_data["task"]}
    data["todo_list"].append(data_uuid)
    print(new_data["task"])
    print(data)
    with open("data.json","w") as file:
        json.dump(data, file)
        return data_uuid
    return None

def deleteByUUID(uuid):
    data = load_data()
    for i in range(len(data["todo_list"])):
        if data["todo_list"][i].get(uuid) != None:
            data["todo_list"].pop(i)
            break
    return {"todo_list": data["todo_list"]}

def updateByUUID(uuid, updatedDataPoint):
    data = load_data()
    for i in range(len(data["todo_list"])):
        if data["todo_list"][i].get(uuid) != None:
            data["todo_list"][i][uuid] = updatedDataPoint["task"]
            break
    return {"todo_list": data["todo_list"]}

def restore_data(data):

    with open("data.json","w") as file:
        json.dump(data, file)
        return True
    return False


class GetPostResource(Resource):
    # Route to return the full list
    def get(self):

        data = load_data()
        print(data)
        return jsonify(data)
    
    def post(self):
        # @app.post("/save")
        data = load_data()
        new_data = store_data(data, request.get_json())
        return jsonify(new_data)
    
class DeleteUpdateSpecificResource(Resource):
    # Route to delete a specific list item
    #@app.route('/delete/<uuid:id>', methods=["DELETE"])
    def delete(self, id):
        id = str(id)
        print(id)
        updated_data = deleteByUUID(id)
        restore_data(updated_data)
        return jsonify({"message": "OK"})
    
    # Route to update a specific list item
    # @app.route('/update/<uuid:id>', methods=["PATCH"])
    def patch(self, id):
        id = str(id)
        updatedDataPoint = request.get_json()
        updatedData = updateByUUID(id, updatedDataPoint)
        restore_data(updatedData)
        return jsonify({"message": "OK"})


api.add_resource(GetPostResource, "/tasks")
api.add_resource(DeleteUpdateSpecificResource, "/<uuid:id>")

if __name__ == "__main__":
    app.run(debug=True)
