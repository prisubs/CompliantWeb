from backend import *
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer


def news_singledate(ticker, date):
    news = grab_single_day(ticker, date)
    sentiment_vader = sentimental(news)
    return {
        "news": news,
        "aggregated_sentiment": sentiment_vader
    }


def news_daterange(ticker, start, end):
    news = grab_date_range(ticker, start, end)
    sentiments_vader = [sentimental(day)  ] # TODO what goes here?
    return  # TODO


def predict_tomorrow(ticker):
    price = future_runner(ticker)
    return {
        "predicted": price
    }


def predict_past(ticker, date):
    df = pipeline_logistic(ticker, date)
    predicted_delta, actual_delta = run_model_logistic(df, "data/logistic.pkl")
    return {
        "predicted": predicted_delta,
        "actual": actual_delta
    }


def company_metadata(ticker):
    meta = make_alias(ticker)
    name, sector, industry = meta[0], meta[1], meta[2]
    return {
        "name": name,
        "sector": sector,
        "industry": industry
    }


# ************** News Analysis Functions ******************** #
def sentimental(news):
    analyzer = SentimentIntensityAnalyzer()
    sentiments = [analyzer.polarity_scores(article)["compound"] for article in news]
    return sum(sentiments)/len(sentiments)


def add_i_days(start, i):
    dt_obj = datetime.datetime.strptime(start, "%Y-%m-%d")
    end_obj = dt_obj + datetime.timedelta(days=i)
    end_str = str(end_obj.strftime("%Y-%m-%d"))
    return end_str


def query_ticker(start, end, ticker):
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    news = client.get_news(tickers=[ticker], startDate=start, endDate=end)
    news = [article["description"] for article in news]
    return news


def grab_single_day(ticker, start):
    end = add_i_days(start, 1)
    news = query_ticker(start, end, ticker)
    return news


def grab_date_range(ticker, start, end):
    news = query_ticker(start, end, ticker)
    return news
