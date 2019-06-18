import indicoio
import CONSTANTS
indicoio.config.api_key = CONSTANTS.INDICOIO_KEY

data = []
#we may have to change this into a csv, I'm not sure yet how we are going to format our files
def get_batch_sentiment_from_scraped_file(name_of_file):
    with open("batch.txt") as f:
        data = [line.strip() for line in f]
    return indicoio.sentiment(data)


#below are just some examples of different features in indicoio
example_of_article_sentiment = indicoio.sentiment_hq("http://www.vanityfair.com/news/2015/10/the-serious-problem-with-treating-donald-trump-seriously", url=True)
example_of_indicoio_keywords = indicoio.keywords("http://www.vanityfair.com/news/2015/10/the-serious-problem-with-treating-donald-trump-seriously", url=True, top_n=5)
if __name__ == "__main__":
    print(indicoio.sentiment('This sentence is awful. This sentence is great!', split='sentence'))
    print("sentiment of the vanity fair article is {0}".format(example_of_article_sentiment))
    print("keywords of the article are:\n{0}".format(keywords))
