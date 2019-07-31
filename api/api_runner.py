from web.backend import *
import datetime


def company_prediction(ticker):
    prediction = future_runner(ticker)
    today = datetime.date.today()
    result = {
        "ticker": ticker,
        "date_predicted": today + datetime.timedelta(days=1),
        "date_calculated": today,
        "prediction": prediction
    }
    return result


def company_metadata(ticker):
    nsi = make_alias(ticker)
    name, sector, industry = nsi[0], nsi[1], nsi[2]

    result = {
        "name": name,
        "sector": sector,
        "industry": industry
    }
    return result


def company_related(ticker):
    return related_tickers(ticker)


def analytics_sentiments(ticker, date):
    rating, delta, good_count, good_headlines, bad_count, bad_headlines, news_category, metadata, related = past_runner(ticker, date)

    result = {
        "good_headline_count": good_count,
        "bad_headline_count": bad_count,
        "good_headlines": good_headlines,
        "bad_headlines": bad_headlines,
        "news_rating": news_category
    }

    return result


def analytics_articles(ticker, date):
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    query_ticker = lambda t, s: client.get_news(tickers=[t], startDate=s)
    jsons = query_ticker(ticker, date)

    result, i = {}, 0
    for json in jsons:
        headline = json["title"]
        desc = json["description"]
        url = json["url"]

        sentiment_body = "{0} {1}".format(headline, desc)
        sentiment = TextBlob(sentiment_body).sentiment.polarity

        article_desc = {
            "headline": headline,
            "description": desc,
            "url": url,
            "sentiment-score": sentiment
        }

        result[i] = article_desc
        i = i + 1

    return result

