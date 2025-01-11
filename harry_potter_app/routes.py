from flask import Blueprint, render_template, request, jsonify
import json
from pathlib import Path
import os

# Define the Flask Blueprint
main = Blueprint("main", __name__)

# Path to the JSON data file
DATA_FILE = Path("harry_potter_app/static/data.json")

def load_data():
    """
    Load data from the JSON file. If the file does not exist, create it with default data.
    
    Returns:
        dict: A dictionary containing house points and students.
    """
    if not os.path.exists(DATA_FILE):
        # Initialize the data file with default values for all houses
        with open(DATA_FILE, 'w') as file:
            json.dump({house: {"points": 0, "students": []} for house in ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]}, file)
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

def save_data(data):
    """
    Save the provided data to the JSON file.

    Args:
        data (dict): The data to save.
    """
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

@main.route("/")
def index():
    """
    Render the main page.

    Returns:
        str: Rendered HTML of the main page.
    """
    return render_template("index.html")

@main.route('/points', methods=['GET', 'POST'])
def points():
    """
    Handle house points data. Supports retrieving or updating points.
    
    GET:
        Returns:
            Response: JSON representation of all house points and students.

    POST:
        Updates the points for a specified house.
        
        Body:
            - house (str): The house to update (e.g., "Gryffindor").
            - points (int): The number of points to add or subtract.
        
        Returns:
            Response: Updated JSON data or an error message if the house is invalid.
    """
    data = load_data()
    if request.method == 'GET':
        return jsonify(data)
    elif request.method == 'POST':
        req = request.json
        house, points = req["house"], req["points"]
        if house in data:
            data[house]["points"] += points
            save_data(data)
            return jsonify(data)
        return jsonify({"error": "House not found"}), 404

@main.route('/students', methods=['POST'])
def students():
    """
    Handle adding or removing students from a house.
    
    POST:
        Body:
            - house (str): The house to update (e.g., "Gryffindor").
            - action (str): The action to perform ("add" or "remove").
            - student (str): The name of the student to add or remove.
        
        Returns:
            Response: Updated JSON data or an error message if the house is invalid.
    """
    data = load_data()
    req = request.json
    house, action, student = req["house"], req["action"], req["student"]
    if house in data:
        if action == "add" and student not in data[house]["students"]:
            data[house]["students"].append(student)
        elif action == "remove" and student in data[house]["students"]:
            data[house]["students"].remove(student)
        save_data(data)
        return jsonify(data)
    return jsonify({"error": "Invalid house"}), 400
