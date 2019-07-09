# takes in a ticker string, YYYY-MM-DD formatted datestring

def runner(ticker, date):
    df = pipeline('data/6m-weekly/{0}-6m-weekly.csv'.format(ticky), ticky)
    g = lm(df, date, ticker)
    return g  # g is a formatted datestring


import pandas as pd
import numpy as np
import datetime
from tiingo import TiingoClient
from sklearn.impute import SimpleImputer
from sklearn import preprocessing
import indicoio
import time
from textblob import TextBlob
from sklearn import linear_model


# feature functions
def good_bag(string_vector):
    bag = pd.read_csv("data/bag_of_words.csv")
    good_bag = bag["Good Words"].apply(str.lower).to_list()
    good_count = 0
    for word in good_bag:
        good_count += string_vector.count(word)
    good = good_count / len(string_vector)
    return good


def bad_bag(string_vector):
    bag = pd.read_csv("data/bag_of_words.csv")
    bad_bag = bag["Bad Words"].apply(str.lower).to_list()
    bad_count = 0
    for word in bad_bag:
        bad_count += string_vector.count(word)
    bad = bad_count / len(string_vector)
    return bad


def aggregate_jsons(json_list):
    result = []
    for json in json_list:
        headline = json["title"]
        desc = json["description"]
        x = headline + " " + desc
        result.append(x)
    return result


def pipeline(df_path, ticky):
    # get the dataframe from csv
    df = pd.read_csv(df_path)

    # fix dates
    df["Date"] = df["Date"].apply(lambda x: pd.to_datetime(x, infer_datetime_format=True))
    df["Start"] = df["Date"].apply(str)
    six_days = lambda start_date: start_date + datetime.timedelta(days=6)
    df["End"] = df["Date"].apply(six_days).apply(str)
    df = df.drop(columns=["Date"])
    remove_time = lambda dt: dt[0:10]
    df["Start"] = df["Start"].apply(remove_time)
    df["End"] = df["End"].apply(remove_time)

    # add json
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    query_ticker = lambda t, s, e: client.get_news(tickers=[t], startDate=s, endDate=e)
    df["JSON"] = df.apply(lambda d: query_ticker(ticky, d["Start"], d["End"]), axis=1)

    # create corpus
    df["corpus"] = df["JSON"].apply(aggregate_jsons)
    df["vectorized"] = df["corpus"]
    combinatric = lambda l: ''.join(l)
    df["corpus"] = df["vectorized"].apply(combinatric)
    indicoio.config.api_key = "25b83c4c388204edd2c6c11cd907e048"

    # add sentiment
    df["sentiment"] = df["corpus"].apply(lambda orig: TextBlob(orig).sentiment.polarity)
    df["sentiment_test"] = df["vectorized"].apply(lambda orig: [TextBlob(o).sentiment.polarity for o in orig]).apply(
        np.mean)
    df["indico_sentiment"] = df["corpus"].apply(lambda text: indicoio.sentiment_hq(text))

    # add bag of words featurization
    df["bad_bag"] = df["vectorized"].apply(bad_bag)
    df["good_bag"] = df["vectorized"].apply(good_bag)

    # change the index so we can access rows by start date
    # df.set_index('Start')

    # return the nice beautiful dataframe
    return df


def mse(v1, v2):
    return np.sum((v1 - v2) ** 2)


def impute(X):
    imp = SimpleImputer(missing_values=np.nan, strategy='mean')
    imp = imp.fit(X)
    X = imp.transform(X)
    return X


def lm(d, datestring, ticky):
    d["lastweek"] = d["Close"]
    d.lastweek = d.lastweek.shift(7)
    training_X_cols = ["Open", "lastweek", "indico_sentiment", "sentiment", "sentiment_test", "bad_bag", "good_bag"]
    training_Y_col = "Close"

    # Traning set will be all rows except for the week in question.
    X_train = d.loc[d["Start"] != datestring, training_X_cols]
    Y_train = d.loc[d["Start"] != datestring, training_Y_col]
    X_test = d.loc[d["Start"] == datestring, training_X_cols]
    Y_test = d.loc[d["Start"] == datestring, training_Y_col]

    X_train, X_test = impute(X_train), impute(X_test)

    scaler = preprocessing.StandardScaler().fit(X_train)
    X_train, X_test = scaler.transform(X_train), scaler.transform(X_test)

    model = linear_model.BayesianRidge()
    model.fit(X_train, Y_train)
    Y_predicted = model.predict(X_test)
    error = Y_test - Y_predicted
    error = error.values
    return "predicted for {0} with an error of {1}".format(ticky, error)




