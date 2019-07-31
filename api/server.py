from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask import jsonify

from api_runner import *

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('ticker', type=str, help="NYSE or NASDAQ ticker", required=True)
parser.add_argument('analysis', type=str, required=False, help='YYYY-DD-MM formatted datestring')

class CompanyPrediction(Resource):
    def get(self):
        ticker = parser.parse_args()["ticker"]
        result = company_prediction(ticker)
        return jsonify(result)


api.add_resource(CompanyPrediction, '/companies/get-prediction/')


class CompanyMetadata(Resource):
    def get(self):
        ticker = parser.parse_args()["ticker"]
        result = company_metadata(ticker)
        return jsonify(result)


api.add_resource(CompanyMetadata, '/companies/metadata/')


class CompanyRelated(Resource):
    def get(self):
        ticker = parser.parse_args()["ticker"]
        result = company_related(ticker)
        return jsonify(result)


api.add_resource(CompanyRelated, '/companies/related/')


class AnalyticsSentiments(Resource):
    def get(self):
        ticker = parser.parse_args()["ticker"]
        date = parser.parse_args()["date"]
        result = analytics_sentiments(ticker, date)
        return jsonify(result)


api.add_resource(AnalyticsSentiments, '/analytics/sentiments/')


class AnalyticsArticles(Resource):
    def get(self):
        ticker = parser.parse_args()["ticker"]
        date = parser.parse_args()["date"]
        result = analytics_articles(ticker, date)
        return jsonify(result)


api.add_resource(AnalyticsArticles, '/analytics/articles/')

if __name__ == '__main__':
     app.run(port='5002')


