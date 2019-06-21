import scikit_box
import scraping_utils
import sentiment_calculator
import pandas as pd
import datetime
#import requests
ary_urls = []
# the main for this file automatically iterates through each ticker
# and generates a 5 year csv containing the article sentiments for
# every two week period

if __name__ == "__main__":
    ticker_ary = ['AAPL', 'CRM', 'GOOGL', 'TSLA', 'AMZN', 'SSNLF', 'MSFT', 'FB', 'NFLX', 'BABA']
    for ticker in ticker_ary:
        d = datetime.datetime.strptime('2014-06-21', "%Y-%m-%d")
        delta = datetime.timedelta(days=14)
        end_date = datetime.datetime.strptime('2019-06-21', "%Y-%m-%d")
        empty_df = pd.DataFrame()
        while d <= end_date:
            pd_scraping = scraping_utils.top_ticker_headlines_two_weeks_tiingo(ticker, d.strftime("%Y-%m-%d"))
            print(pd_scraping)
            final_ary = sentiment_calculator.df_sentiment(pd_scraping)
            final_ary['date'] = d.strftime("%Y-%m-%d")
            empty_df = pd.concat(empty_df, final_ary)
            d += delta
        empty_df.to_csv(ticker + 'dataframe.csv')




'''
    #first we get a list of tesla headlines and we store their urls
    ary_urls = top_tesla_headlines_store_as_url()
    #store the sentiments of theses urls and the urls themselves in a data frame
    data_frame_of_sentiments_and_urls = sentiment_calculator.get_individ_sentiment_from_ary_and_store_as_dataframe(ary_urls)
    #lastly run ML on them
    scikit-box.take_in_data_frame_modify_data_and_labels(data_frame_of_sentiments_and_urls)
'''
