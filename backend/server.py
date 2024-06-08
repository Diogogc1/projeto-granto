from flask import Flask
from flask_cors import CORS, cross_origin
from ai import return_real_values

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def real_values():
    return return_real_values()