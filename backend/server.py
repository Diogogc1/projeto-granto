from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from ai import return_real_values
from pdf import extract_text_from_pdf

import os

app = Flask(__name__)
cors = CORS(app)

@app.route("/post", methods = ["POST"])
def upload_file():
    file = request.files['file']
    if file:
        filepath = os.path.join("./training_data", file.filename)
        if not os.path.exists("./training_data"):
            os.makedirs("./training_data")
        file.save(filepath)
        pdf_text = extract_text_from_pdf(filepath)
        real_values = return_real_values(pdf_text)
        return jsonify({"message": "File uploaded sucessfuly!", "filepath": filepath, "real_values": real_values}, 200)
    else:
        return jsonify({"error": "No file selected or another error ocurred"}), 400
    