import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from ai.main import return_real_values, return_cats, return_cnpjs
from utils.pdf import extract_text_from_pdf

app = Flask(__name__)
CORS(app)

def create_contracts_dir():
    if not os.path.exists("./tests_contracts"):
        os.makedirs("./tests_contracts")

def upload_file(file):
    create_contracts_dir()
    filepath = os.path.join("./tests_contracts", file.filename)
    file.save(filepath)
    text = extract_text_from_pdf(filepath)
    return text

def show_file_info(text, mode):
    try:
        cnpjs = return_cnpjs(text, mode)
        real_values = return_real_values(text, mode)
        cats = return_cats(text)
        return jsonify({"message": "Success!", "cnpjs": cnpjs, "real_values": real_values, "cats": cats}), 200
    except Exception as e:
        return jsonify({"error": "Failed to process the file: " + str(e)}), 500
    
@app.route("/post/process-text", methods=["POST"])
def process_document_text():
    try:
        text = request.get_json()
        return show_file_info(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/post/upload-file", methods=["POST"])
def handle_file_upload():
    try:
        file = request.files.get("file")
        mode = request.form['mode']
        text = upload_file(file)
        return show_file_info(text, mode)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
