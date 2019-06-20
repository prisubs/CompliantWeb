#import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import datetime
import tweepy
import CONSTANTS
from newsapi.newsapi_client import NewsApiClient
from tiingo import TiingoClient

#setup python tiingo for querying news about a certain ticker
TIINGO_API_KEY = CONSTANTS.TIINGO_KEY
config = {
    'api_key': TIINGO_API_KEY,
    'session': True
}
client = TiingoClient(config)

# this is just an example of how tiingo works
#articles_tiingo = client.get_news(tickers=['GOOGL', 'AAPL'], tags=['Laptops'], sources=['washingtonpost.com'], startDate='2017-01-01',endDate='2017-08-31')

'''
 this is the actual tiingo function that we can use, I'm limiting to ten articles for now so that if this accidentally gets ran during
 this initial stage we won't be wasting calls
 ALSO, there is a way to hook this up to pandas, but that might only be for ticker data from tiingo, I'm not sure yet
'''
def top_ticker_headlines_two_weeks_tiingo(ticker, date_start, date_end):
    return client.get_news(tickers=[ticker], startDate = date_start, endDate = date_end, limit=10)






#this is the client library, using this because of 'requests' error
'''
def top_tesla_headlines_store_as_url():
    newsapi = NewsApiClient(api_key='66af3123197e43a4b55137cfddf67a2c')
    top_headlines = newsapi.get_top_headlines(q='tesla',
                                              category='business',
                                              language='en',
                                              country='us')
    tesla_json = top_headlines
    articles = tesla_json["articles"]
    urls = []
    for article in articles:
        urls.append(article["url"])
    return urls
'''




# Returns a list of items from a particular classname
'''
def page_content(url, class_name):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    content = soup.find_all(class_ = class_name)
    result = pd.Series(content)
    clean_html = lambda html: re.sub("<.*?>", "", str(html))
    return result.apply(clean_html)
'''
def write_content_to_file(url, class_name):
    fo = open(str(class_name) + str(datetime.datetime.now()) + "foo.csv", "w+")
    fo.write(page_content(url, class_name))
    fo.close()

# Returns a dataframe of paired HTML elements from a list of classnames
def paired_content(url, class_names):
    df = pd.DataFrame()
    for class_name in class_names:
        df[class_name] = page_content(url, class_name)
    return df

# Finds 100 tweets on a hashtag query
# Datestring needs to be formatted as YYYY-MM-DD
# Hashtag needs to be in format #hashtag
# Returns dataframe of tweets and dates
def hashtag_scrape(hashtag, datestring):
    auth = tweepy.OAuthHandler(CONSTANTS.consumer_key, CONSTANTS.consumer_secret)
    auth.set_access_token(CONSTANTS.access_token, CONSTANTS.access_token_secret)
    api = tweepy.API(auth,wait_on_rate_limit=True)

    texts, dates = [], []
    cursor = tweepy.Cursor(api.search, q = hashtag,count=100, lang="en", since= datestring).items()

    for tweet in cursor:
        texts.append(tweet.text)
        dates.append(tweet.created_at)

    df = pd.DataFrame({"tweet": texts, "date": dates})
    return df


#this is what a usual newsapi scrape looks like. if the indicoio url analysis takes a long time, we still might need this
'''
def financial_post_scrape():
    main_url = "https://newsapi.org/v2/articles?source=financial-post&sortBy=top&apiKey=" + CONSTANTS.newsapikey
    open_fp_page = requests.get(main_url).json()

    article = open_fp_page["articles"]
    results = []
    for ar in article:
        results.append(ar["title"])
    for i in range(len(results)):
        print(i+1, results[i])
'''


#this function sweeps all the top headlines and stores their urls in an array, which we can then pass in into the indicoio url analyzer
#also, if we want we could use the client library instead, it would be easier
'''
def top_tech_headlines_scrape_and_store_as_url():
    main_url = 'https://newsapi.org/v2/top-headlines?category=technology&apiKey=66af3123197e43a4b55137cfddf67a2c'
    open_tech_head_unformatted = requests.get(main_url)
    open_tech_head = open_tech_head_unformatted.json()
    articles = open_tech_head["articles"]
    urls = []
    for article in articles:
        urls.append(article["url"])
    for i in range(len(results)):
        print(i+1, urls[i])
    return urls
'''
