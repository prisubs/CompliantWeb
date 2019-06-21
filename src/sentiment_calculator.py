import indicoio
import CONSTANTS
import scraping_utils
import requests
import pandas as pd
indicoio.config.api_key = "026012f2d0b869994cf77bf084d58a97"

data = []
#we may have to change this into a csv, I'm not sure yet how we are going to format our files
def get_batch_sentiment_from_scraped_file(name_of_file):
    with open("batch.txt") as f:
        data = [line.strip() for line in f]
    return indicoio.sentiment(data)

def df_sentiment(ary_df):
    ary = []
    for combined_titles_and_descriptions in ary_df['combined_titles_and_descriptions']:
        ary.append(indicoio.sentiment(combined_titles_and_descriptions))
    sentiment_df = pd.DataFrame(ary)
    concater = [ary_df, sentiment_df]
    result = ary_df.join(sentiment_df)
    return result

def get_individ_sentiment_from_ary_and_store_as_dataframe(ary_df):
    my_multdimensional_array = [[]]
    for url in ary_df['url']:
        if (url != "nan"):
            my_multdimensional_array.append(url, indicoio.sentiment_hq(url))
    data_frame = pd.DataFrame(my_multdimensional_array, columns = ['Urls', 'sentiments'])
    concater = [ary_df, data_frame]
    result = pd.concat(concater)
    return result

#below are just some examples of different features in indicoio
example_of_article_sentiment = indicoio.sentiment_hq("http://www.vanityfair.com/news/2015/10/the-serious-problem-with-treating-donald-trump-seriously", url=True)
#example_of_indicoio_keywords = indicoio.keywords("http://www.vanityfair.com/news/2015/10/the-serious-problem-with-treating-donald-trump-seriously", url=True, top_n=5)

if __name__ == "__main__":
    print(indicoio.sentiment('This sentence is awful. This sentence is great!', split='sentence'))
    print("sentiment of the vanity fair article is {0}".format(example_of_article_sentiment))
    #print("keywords of the article are:\n{0}".format(keywords))
