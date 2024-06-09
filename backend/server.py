import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from ai.main import return_real_values, return_cats
from utils.pdf import extract_text_from_pdf

app = Flask(__name__)
CORS(app)

def create_contracts_dir():
    if not os.path.exists("./tests_contracts"):
        os.makedirs("./tests_contracts")

def upload_file(file):
    try:
        filepath = os.path.join("./tests_contracts", file.filename)
        create_contracts_dir()
        file.save(filepath)
        text = extract_text_from_pdf(filepath)
        return show_file_info(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def show_file_info(text):
    try:
        real_values = return_real_values(text)
        cats = return_cats(text)
        return jsonify({"message": "Success!", "real_values": real_values, "cats": cats}), 200
    except Exception as e:
        return jsonify({"error": "Failed to process the file: " + str(e)}), 500

@app.route("/post", methods=["POST"])
def handle_file_upload():
    try:
        file = request.files.get("file")
        return upload_file(file)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

