import requests
import pandas as pd
import datetime
import scrapy
from scrapy.crawler import CrawlerProcess


class NYTSpider(scrapy.Spider):
    name = 'NYTimes_spider'

    def __init__(self, start_urls=None, titles=None, descriptions=None):
        self.start_urls = start_urls
        self.titles = titles
        self.descriptions = descriptions

    def parse(self, response):
        SET_SELECTOR = ".css-138we14"

        for article in response.css(SET_SELECTOR):
            TITLE_SELECTOR = 'h4 ::text'
            DESCR_SELECTOR = 'p ::text'

            titles.append(article.css(TITLE_SELECTOR).extract_first())
            descriptions.append(article.css(DESCR_SELECTOR).extract()[1])


            yield {
                'title': article.css(TITLE_SELECTOR).extract_first(),
                'description': article.css(DESCR_SELECTOR).extract()[1]
            }

if __name__ == "__main__":
    titles = []
    descriptions = []
    process = CrawlerProcess({
        'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
    })
    process.crawl(NYTSpider, start_urls=['https://www.nytimes.com/search?endDate=20180614&query=google&sort=best&startDate=20180612'], titles = titles, descriptions = descriptions)
    process.start()
    print(titles)
    print(descriptions)
