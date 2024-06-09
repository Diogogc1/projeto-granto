import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from ai.main import return_real_values, return_cats
from utils.pdf import extract_text_from_pdf

app = Flask(__name__)
CORS(app)

def upload_file(file):
    try:
        if file:
            filepath = os.path.join("./tests_contracts", file.filename)
            if not os.path.exists("./tests_contracts"):
                os.makedirs("./tests_contracts")
            file.save(filepath)
            return show_file_info(filepath)
        else:
            raise ValueError("No file selected or another error occurred")
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def show_file_info(filepath):
    try:
        text = extract_text_from_pdf(filepath)
        real_values = return_real_values(text)
        cats = return_cats(text)
        return jsonify({"message": "Success!", "real_values": real_values, "cats": cats}), 200
    except Exception as e:
        return jsonify({"error": "Failed to process the file: " + str(e)}), 500

@app.route("/post", methods=["POST"])
def upload_file_and_return_info():
    try:
        file = request.files.get("file")
        if file:
            return upload_file(file)
        else:
            raise ValueError("No file selected")
    except Exception as e:
        return jsonify({"error": str(e)}), 400

