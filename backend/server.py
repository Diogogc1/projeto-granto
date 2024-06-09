from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from ai.main import return_real_values, return_cats
from utils.pdf import extract_text_from_pdf

import os

app = Flask(__name__)
cors = CORS(app)

def upload_file(file):
    if file:
        filepath = os.path.join("./tests_contracts", file.filename)
        if not os.path.exists("./tests_contracts"):
            os.makedirs("./tests_contracts")
        file.save(filepath)
        return show_file_info(filepath)
    else:
        return jsonify({"error": "No file selected or another error occurred"}), 400  
    
def show_file_info(filepath):
    text = extract_text_from_pdf(filepath)
    real_values = return_real_values(text)
    cats = return_cats(text)
    return jsonify({"message": "Success!", "real_values": real_values, "cats" : cats}), 200  

@app.route("/post", methods=["POST"])
def upload_file_and_return_info():
    file = request.files.get("file") 
    if file:
        return upload_file(file)  
    else:
        return jsonify({"error": "No file selected"}), 400  

if __name__ == "__main__":
    app.run(debug=True)
