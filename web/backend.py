import pandas as pd
import numpy as np
import datetime
from tiingo import TiingoClient

from sklearn.impute import SimpleImputer
from sklearn import preprocessing
from sklearn.linear_model import LinearRegression

import indicoio
from textblob import TextBlob
import _pickle as cPickle
import math
import sys

'''
[INPUT]
ticker: 4-5 digit ticker on nyse [STRING]
day: whether prediction is for the next day [BOOLEAN]
week: whether prediction is for the next week [BOOLEAN]

[OUTPUT]
predicted_price: our prediction on tomorrow's price [FLOAT]
'''
def future_runner(ticker):
    today = datetime.date.today()
    testing_df = pipeline_linear(ticker, today, dyn=True)
    model = create_model_linear(ticker)
    prediction_formatted = run_model_linear(testing_df, model)
    return prediction_formatted

'''
[INPUT]
ticker: 4-5 digit ticker on nyse [STRING]
date: yyyy-mm-dd formatted datestring [STRING]

[OUTPUT]
rating: BUY or SELL [String]
delta: "TICKER went down by AMOUNT." [String]
good_count: amount of good headlines out of 100 [Int]
good_headlines: sampling of five good headlines [List<String>]
bad_count: amount of bad headlines out of 100 [Int]
bad_headlines: sampling of five bad headlines [List<String>]
news_category: GOOD or OKAY or BAD [String]
metadata: full company name, sector, industry [List<String>]
'''
def past_runner(ticker, date):
    df = pipeline_logistic(ticker, date)
    predicted_delta, actual_delta = run_model_logistic(df, "data/logistic.pkl")
    rating, delta = translate_delta(predicted_delta), find_delta(df["Start"][0], df["End"][0], ticker)
    headlines = df["headlines"][0]
    good_headlines, bad_headlines, good_count, bad_count = classify_headlines(headlines)
    news_category = make_category(good_count, bad_count)
    metadata = make_alias(ticker)
    return rating, delta, good_count, good_headlines, bad_count, bad_headlines, news_category, metadata

'''
**************** UTILITY FUNCTIONS ****************
create_model_linear: dynamically constructs linear regression model
weekly_visualization: saves a png figure of sentiment by week as weekly_sentiment.png
make_alias: turns a ticker into its full name, sector, and industry in a list
pretty_print: takes inputs from past_runner, outputs them for testing
printlist: pretty prints a list of strings
find_delta: outputs a formatted string for stock movement
translate_delta: changes label into a buy/sell rating
make_category: transforms good/bad headline counts into a status string
classify_headlines: returns counts and samples for a single date's headlines
single_headlines: processes one headline
impute: performs normalization prior to logistic regression
good_bag/bad_bag: creates bag of words features from word lists and text corpus
aggregate_jsons: turns a response from tiingo client into a corpus
pickle_down: unpickles a model to be run on user query
six_days: calculates end date of a week from a date
remove_time: formats a string in yyyy-mm-dd style
pipeline: transforms a single date and row into observation for feature matrix
multi_row_pipeline: computes entire feature matrix
run_model_logistic: runs logistic regression on test point
run_model_linear: runs logistic regression on tomorrow
****************************************************
'''
def create_model_linear(ticker):
    dates = pd.read_csv(r"data/dates.csv")["0"].tolist()
    master_df_set = []
    for date in dates:
        row = pipeline_linear(ticker, date, dyn=False)
        master_df_set.append(row)
    training_df = pd.concat(master_df_set)
    X_train = training_df[["indico_sentiment", "sentiment", "sentiment_test", "bad_bag", "good_bag", "lastweek"]]
    Y_train = training_df["price"]
    model = LinearRegression().fit(X_train, Y_train)
    return model


def weekly_visualization(ticker, start_date):
    return ...  #TODO

def make_alias(ticker):
    tickers = pd.read_csv("data/ticker_translate.csv")
    ticker = ticker.upper()
    data = tickers.loc[tickers["Ticker"] == ticker, ["Name", "Sector", "Industry"]]
    return data.values.tolist()[0]  # name, sector, industry

def pretty_print(a, b, c, d, e, f, g):
    print("RATING: {0} \n{1}".format(a, b), file=sys.stderr)
    print("{0} good headlines:".format(c), file=sys.stderr)
    printlist(d)
    print("{0} bad headlines:".format(e), file=sys.stderr)
    printlist(f)
    print("news rating: {0}".format(g), file=sys.stderr)
    return


def printlist(lis):
    for l in lis:
        print("     " + str(l), file=sys.stderr)


# display functions
def find_delta(start, end, ticker):
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})
    prices = client.get_ticker_price(ticker, fmt='object', startDate=start, endDate=end, frequency='daily')
    delta = prices[-1].close - prices[0].open
    delta = math.ceil(delta*100)/100
    if delta < 0:
        return "{0} went down by {1}.".format(ticker, delta)
    else:
        return "{0} went up by {1}.".format(ticker, delta)


def translate_delta(delta):
    if delta == 1:
        return "BUY"
    else:
        return "SELL"


# Headline classifier functions
def make_category(goods, bads):
    ratio = goods/bads
    if ratio > 1.25:
        return "GOOD" #green
    elif ratio > 0.75:
        return "OKAY" #yellow
    else:
        return "BAD" #red


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
    baddest, goodest = [b[0] for b in baddest], [g[0] for g in goodest]
    baddest, goodest = baddest[0:5], goodest[0:5]

    return goodest, baddest, good_count, bad_count


def single_headlines(headline):
    headline = TextBlob(headline)
    p = headline.sentiment.polarity
    return p


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

def base_pipeline(ticker, date, dynamic=False):
    # api auth
    indicoio.config.api_key = "04878c9a5bb99aaf8a8ccdd65954442a"
    client = TiingoClient({"api_key": "a265fc4a1013923f970d16e7348195074e97fcb0"})

    # fix dates
    start_date = pd.to_datetime(pd.Series([date]), infer_datetime_format=True)
    end_date = start_date.apply(six_days).apply(str)[0]
    start_date = start_date.apply(str).apply(remove_time)[0]

    # add json
    query_ticker = lambda t, s, e: client.get_news(tickers=[t], startDate=s, endDate=e)
    json = query_ticker(ticker, start_date, end_date)

    # create corpus
    corpus = aggregate_jsons(json)
    vectorized = corpus
    combinatric = lambda l: ''.join(l)
    corpus = combinatric(vectorized)

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

    # get prices for return
    open_price, close_price = 0.0, 0.0
    if not dynamic:
        prices = client.get_ticker_price(ticker, fmt='object', startDate=start_date, endDate=end_date, frequency='daily')
        open_price = prices[0].open
        close_price = prices[-1].close

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
            "headlines": pd.Series([vectorized]),
        }
    )
    return df, open_price, close_price

def pipeline_linear(ticker, date, dyn):
    df, open_price, close_price = base_pipeline(ticker, date, dynamic=dyn)
    df["price"] = pd.Series([close_price])
    return df

def pipeline_logistic(ticker, date):
    df, open_price, close_price = base_pipeline(ticker, date)
    # add the delta - up or down
    tri_delt = close_price - open_price
    if tri_delt > 0:
        delta = 1
    else:
        delta = 0

    df["delta"] = pd.Series([delta])
    return df


def multi_row_pipeline(dates, ticker, pipeline_function=pipeline_logistic):
    rows = []
    for date in dates:
        row = pipeline_function(ticker, date)
        rows.append(row)
    df = pd.concat(rows)
    return df

def run_model_linear(df, model):
    X_test = df[["indico_sentiment", "sentiment", "sentiment_test", "bad_bag", "good_bag", "lastweek"]]
    prediction = model.predict(X_test).tolist()[0]
    fmted = "Our dynamically constructed model predicted ${0} for tomorrow's price.".format(prediction)
    return fmted

# returns in the form PREDICTED, ACTUAL =====> two values need to be unpacked
def run_model_logistic(df, model_path):
    model = pickle_down(model_path)
    X_test = df[["indico_sentiment", "sentiment", "sentiment_test", "bad_bag", "good_bag"]]
    Y_test = df["delta"]

    X_test = impute(X_test)
    scaler = preprocessing.StandardScaler().fit(X_test)
    X_test = scaler.transform(X_test)
    Y_predicted = model.predict(X_test)

    return Y_predicted.tolist(), Y_test.tolist()


