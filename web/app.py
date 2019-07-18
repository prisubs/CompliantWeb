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


ratingvar = "NULL"
goodheadlines = "NULL"
badheadlines = "NULL"
goodcount = 0
badcount = 0
@app.route('/ticker-get', methods = ['GET', 'POST'])  
def ticker_get():
    if request.method == 'POST':
        data = request.get_json()
        date, ticker = clean_inputs(data["date"], data["ticker"])
        ratingone, delta, good_countone, good_headlinesone, bad_countone, bad_headlinesone, news_category = backy.past_runner(ticker, date)
        global ratingvar
        ratingvar = ratingone
        global goodheadlines
        goodheadlines = good_headlinesone
        global badheadlines
        badheadlines = bad_headlinesone
        global goodcount
        global badcount
        goodcount = good_countone
        badcount = bad_countone
        backy.pretty_print(ratingone, delta, good_countone, good_headlinesone, bad_countone, bad_headlinesone, news_category)
        return jsonify(rating=ratingvar, good_headlines=goodheadlines, bad_headlines = badheadlines, good_count = goodcount, bad_count = badcount)



    '''
    elif request.method == 'GET':
        print("RATING" + str(rating), file=sys.stderr)
        return redirect('/')
    '''

def clean_inputs(date, ticker):
    date = str(date)[0:10]
    ticker = str(ticker)
    return date, ticker

if __name__ == '__main__':
    app.run(debug = True)
