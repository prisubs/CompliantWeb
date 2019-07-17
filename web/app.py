from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

import sys
from flask import Flask, render_template, flash, url_for, redirect, request, jsonify, Response, send_file
import backend as backy

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/')
def initial():
    return render_template('homepage.html')


@app.route('/ticker-get', methods = ['GET', 'POST'])  
def ticker_get():
    if request.method == 'POST':
        data = request.get_json()
        response = "testing testing 1 2 3"
        a, b, c, d, e, f, g = backy.past_runner("aapl", "2019-05-05")
        backy.pretty_print(a, b, c, d, e, f, g)
        return redirect('/')

if __name__ == '__main__':
    app.run(debug = True)
