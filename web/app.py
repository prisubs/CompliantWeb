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
        date, ticker = clean_inputs(data["date"], data["ticker"])
        a, b, c, d, e, f, g = backy.past_runner(ticker, date)
        backy.pretty_print(a, b, c, d, e, f, g)
        return redirect('/')

def clean_inputs(date, ticker):
    date = str(date)[0:10]
    ticker = str(ticker)
    return date, ticker

if __name__ == '__main__':
    app.run(debug = True)
