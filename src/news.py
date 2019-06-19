from newsapi.newsapi_client import NewsApiClient

if __name__ == "__main__":
    newsapi = NewsApiClient(api_key='66af3123197e43a4b55137cfddf67a2c')
    top_headlines = newsapi.get_top_headlines(q='bitcoin',
                                              category='business',
                                              language='en',
                                              country='us')
    print(top_headlines)

