# This function returns all analysis for a specific date in the PAST.
def past_runner(ticker, date):
    df = pipeline(ticker, date)
    predicted_delta, actual_delta = run_model(df, "data/logistic.pkl")
    predicted_delta, actual_delta = translate_delta(predicted_delta), translate_delta(actual_delta)
    headlines = df["headlines"][0]
    good_headlines, bad_headlines, good_count, bad_count = classify_headlines(headlines)
    base_result = "predicted move: {0} \nactual move: {1} \nfound {2} good headlines: {3} \nfound {4} bad headlines: {5}"
    result = base_result.format(predicted_delta, actual_delta, good_count, good_headlines, bad_count, bad_headlines)
    return result


# display functions
def translate_delta(delta):
    if delta == 1:
        return "UP"
    else:
        return "DOWN"

# Headline classifier functions
def classify_headlines(headline_list):
    bad, good = [], []
    for headline in headline_list:
        ind_polarity = single_headlines(headline)
        if ind_polarity > 0:
            good.append([headline, ind_polarity])
        else:
            bad.append([headline, ind_polarity])
    bad_count, good_count = len(bad), len(good)
    baddest, goodest = sorted(bad, key=lambda x: x[1], reverse=False), sorted(good, key=lambda x: x[1], reverse=True)
    baddest, goodest = baddest[0:5], goodest[0:5]

    return goodest, baddest, good_count, bad_count


def single_headlines(headline):
    headline = TextBlob(headline)
    p = headline.sentiment.polarity
    return p


# Logistic Regression functions
# To modify the model, use notebook serialize_model.ipynb and update changes here
import pandas as pd
import numpy as np
import datetime
from tiingo import TiingoClient
from sklearn.impute import SimpleImputer
from sklearn import preprocessing
import indicoio
from textblob import TextBlob
import _pickle as cPickle

# feature functions
def impute(X):
    imp = SimpleImputer(missing_values=np.nan, strategy='mean')
    imp = imp.fit(X)
    X = imp.transform(X)
    return X

def good_bag(string_vector):
    bag = pd.read_csv("data/sentiment_word_list.csv")
    good_bag = bag["good"].dropna().apply(str.lower).to_list()
    count = 0
    ttl_length = 0
    string_vector = ' '.join(string_vector)
    for word in good_bag:
        for word2 in string_vector.split():
            ttl_length = ttl_length + 1
            if word.lower() == word2.lower():
                count = count + 1
    return count/ttl_length


def bad_bag(string_vector):
    bag = pd.read_csv("data/sentiment_word_list.csv")
    bad_bag = bag["bad"].apply(str.lower).to_list()
    count = 0
    ttl_length = 0
    string_vector = ' '.join(string_vector)
    for word in bad_bag:
        for word2 in string_vector.split():
            ttl_length = ttl_length + 1
            if word.lower() == word2.lower():
                count = count + 1
    return count/ttl_length


def aggregate_jsons(json_list):
    result = []
    for json in json_list:
        headline = json["title"]
        desc = json["description"]
        x = headline + " " + desc
        result.append(x)
    return result


def pickle_down(filepath):
    with open(filepath, 'rb') as fid:
        model_loaded = cPickle.load(fid)
    return model_loaded


def six_days(start_date):
    return start_date + datetime.timedelta(days=6)


def remove_time(dt):
    return dt[0:10]


def pipeline(ticker, date):
    start_date = pd.to_datetime(pd.Series([date]), infer_datetime_format=True)
    end_date = start_date.apply(six_days).apply(str)[0]
    start_date = start_date.apply(str).apply(remove_time)[0]

    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    prices = client.get_ticker_price(ticker, fmt='object', startDate=start_date, endDate=end_date, frequency='daily')
    open_price = prices[0].open
    close_price = prices[-1].close

    # add json
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    query_ticker = lambda t, s, e: client.get_news(tickers=[t], startDate=s, endDate=e)
    json = query_ticker(ticker, start_date, end_date)

    # create corpus
    corpus = aggregate_jsons(json)
    vectorized = corpus
    combinatric = lambda l: ''.join(l)
    corpus = combinatric(vectorized)

    indicoio.config.api_key = "04878c9a5bb99aaf8a8ccdd65954442a"

    # add sentiment
    mean = lambda listy: sum(listy) / len(listy)
    sentiment = (lambda orig: TextBlob(orig).sentiment.polarity)(corpus)
    sentiment_test = mean((lambda orig: [TextBlob(o).sentiment.polarity for o in orig])(vectorized))
    indico_sentiment = (lambda text: indicoio.sentiment_hq(text))(corpus)

    # add bag of words featurization
    badbag = bad_bag(vectorized)
    goodbag = good_bag(vectorized)

    # add last week's data
    start_last = pd.to_datetime(pd.Series([start_date])).apply(
        lambda start_date: start_date - datetime.timedelta(days=6))
    start_last = remove_time(str(start_last.values[0]))
    end_last = start_date
    lastweek = client.get_ticker_price(ticker, fmt='object', startDate=start_last, endDate=end_last, frequency='daily')
    lastweek = lastweek[0].close

    # add the delta - up or down
    tri_delt = close_price - open_price
    if tri_delt > 0:
        delta = 1
    else:
        delta = 0

    df = pd.DataFrame(
        {
            "Start": pd.Series([start_date]),
            "End": pd.Series([end_date]),
            "sentiment": pd.Series([sentiment]),
            "sentiment_test": pd.Series([sentiment_test]),
            "indico_sentiment": pd.Series([indico_sentiment]),
            "bad_bag": pd.Series([badbag]),
            "good_bag": pd.Series([goodbag]),
            "lastweek": pd.Series([lastweek]),
            "delta": pd.Series([delta]),
            "headlines": pd.Series([vectorized])
        }
    )

    return df

def multi_row_pipeline(dates, ticker):
    rows = []
    for date in dates:
        row = pipeline(ticker, date)
        rows.append(row)
    df = pd.concat(rows)
    return df


# returns in the form PREDICTED, ACTUAL =====> two values need to be unpacked
def run_model(df, model_path):
    model = pickle_down(model_path)
    X_test = df[["indico_sentiment", "sentiment", "sentiment_test", "bad_bag", "good_bag"]]
    Y_test = df["delta"]

    X_test = impute(X_test)
    scaler = preprocessing.StandardScaler().fit(X_test)
    X_test = scaler.transform(X_test)
    Y_predicted = model.predict(X_test)
    
    return Y_predicted.tolist(), Y_test.tolist()

g = past_runner("fb", "2019-06-05")
print(g)