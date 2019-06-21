import scikit_box
import scraping_utils
import sentiment_calculator
import pandas as pd
import datetime
#import requests
ary_urls = []
if __name__ == "__main__":
    d = datetime.datetime.strptime('2014-06-21', "%Y-%m-%d")
    delta = datetime.timedelta(days=14)
    end_date = datetime.datetime.strptime('2019-06-21', "%Y-%m-%d")
    while d <= end_date:
        print(d.strftime("%Y-%m-%d"))
        pd_scraping = scraping_utils.top_ticker_headlines_two_weeks_tiingo('AAPL', d.strftime("%Y-%m-%d"))
        print(pd_scraping)
        final_ary = sentiment_calculator.df_sentiment(pd_scraping)
        print(final_ary)
        final_ary.to_csv(d.strftime("%Y-%m-%d") + 'AAPL.csv')
        d += delta

'''
    #first we get a list of tesla headlines and we store their urls
    ary_urls = top_tesla_headlines_store_as_url()
    #store the sentiments of theses urls and the urls themselves in a data frame
    data_frame_of_sentiments_and_urls = sentiment_calculator.get_individ_sentiment_from_ary_and_store_as_dataframe(ary_urls)
    #lastly run ML on them
    scikit-box.take_in_data_frame_modify_data_and_labels(data_frame_of_sentiments_and_urls)
'''
