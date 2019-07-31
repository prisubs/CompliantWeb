from flask import Flask, request
from flask_restful import Resource, Api
from flask import jsonify

from api_runner import *

app = Flask(__name__)
api = Api(app)


class CompanyPrediction(Resource):
    def get(self, ticker):
        result = company_prediction(ticker)
        return jsonify(result)

api.add_resource(CompanyPrediction, '/companies/get-prediction/<ticker>')


class CompanyMetadata(Resource):
    def get(self, ticker):
        result = company_metadata(ticker)
        return jsonify(result)

api.add_resource(CompanyMetadata, '/companies/metadata/<ticker>')


class CompanyRelated(Resource):
    def get(self, ticker):
        result = company_related(ticker)
        return jsonify(result)

api.add_resource(CompanyRelated, '/companies/related/<ticker>')


class AnalyticsSentiments(Resource):
    def get(self, ticker, date):
        result = analytics_sentiments(ticker, date)
        return jsonify(result)

api.add_resource(AnalyticsSentiments, '/analytics/sentiments/<ticker><date>')


class AnalyticsArticles(Resource):
    def get(self, ticker, date):
        result = analytics_articles(ticker, date)
        return jsonify(result)

api.add_resource(AnalyticsArticles, '/analytics/articles/<ticker><date>')
