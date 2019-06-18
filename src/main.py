import scikit_box
from scraping_utils import top_tesla_headlines_store_as_url
import sentiment_calculator
#import requests
ary_urls = []
if __name__ == "__main__":
    #first we get a list of tesla headlines and we store their urls
    ary_urls = top_tesla_headlines_store_as_url()
    #store the sentiments of theses urls and the urls themselves in a data frame
    data_frame_of_sentiments_and_urls = sentiment_calculator.get_individ_sentiment_from_ary_and_store_as_dataframe(ary_urls)
    #lastly run ML on them
    scikit-box.take_in_data_frame_modify_data_and_labels(data_frame_of_sentiments_and_urls)
