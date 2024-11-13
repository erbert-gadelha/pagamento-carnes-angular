from flask import Flask, jsonify
from flask_cors import CORS
import time
import random



app = Flask(__name__)
CORS(app)


@app.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({
        "message": "Hello, World!"
        })

@app.route('/api/payments', methods=['GET'])
def get_payments ():
    
    time.sleep(random.randrange(start=0, stop=100) / 50 )
    return jsonify([
            { "key":0,  "name": 'janeiro',    "closedAt": "25/03/2000", "pixUrl": None},
            { "key":1,  "name": 'fevereiro',  "closedAt": "25/03/2000", "pixUrl": None},
            { "key":2,  "name": 'março',      "closedAt": "25/03/2000", "pixUrl": None},
            { "key":3,  "name": 'abril',      "closedAt": "25/03/2000", "pixUrl": None},
            { "key":4,  "name": 'maio',       "closedAt": None,         "pixUrl": "https://www.google.com"},
            { "key":5,  "name": 'junho',      "closedAt": None,         "pixUrl": None},

            { "key":6,  "name": 'julho',      "closedAt": None,         "pixUrl": None},
            { "key":7,  "name": 'agosto',     "closedAt": None,         "pixUrl": None},
            { "key":8,  "name": 'setembro',   "closedAt": None,         "pixUrl": None},
            { "key":9,  "name": 'outubro',    "closedAt": None,         "pixUrl": None},
            { "key":10, "name": 'novembro',   "closedAt": None,         "pixUrl": None},
            { "key":11, "name": 'dezembro',   "closedAt": None,         "pixUrl": None},
        ])

if __name__ == '__main__':
    app.run(debug=True)
