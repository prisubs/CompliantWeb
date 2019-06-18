import scikit_box
from scraping_utils import top_tesla_headlines_store_as_url
import sentiment_calculator
#import requests
ary_urls = []
if __name__ == "__main__":
    ary_urls = scraping_utils.top_tesla_headlines_store_as_url()
    data_frame_of_sentiments_and_urls = sentiment_calculator.get_individ_sentiment_from_ary_and_store_as_dataframe(ary_urls)
    scikit-box.take_in_data_frame_modify_data_and_labels(data_frame_of_sentiments_and_urls)
