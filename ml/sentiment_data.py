import requests
import indicoio
import pandas as pd
import numpy as np
import json

indicoio.config.api_key = '528e108aa79cf6b96b509c5b19e61734';

api_token = 'a265fc4a1013923f970d16e7348195074e97fcb0'
api_url = 'https://api.tiingo.com/tiingo/news?tickers=crm&startDate=2014-06-05&endDate=2014-06-15&limit=10'
headers = {'Content-Type': 'application/json',
           'Authorization': 'Token a265fc4a1013923f970d16e7348195074e97fcb0'}
response = requests.get(api_url, headers=headers)
json_final = json.loads(response.content.decode('utf-8'))

t= pd.DataFrame()
# t['a'] = [1, 4]
r = []
t1 = []
r1=[]
s=[]
s1 = []
for i in json_final:
    t1.append(i["title"])
    r.append(i["description"])
    r1.append(i["url"])
    s.append(indicoio.sentiment(i["description"]))
    s1.append(indicoio.sentiment(i["description"]))


t["title"] = pd.Series(t1)    
t["description"] = pd.Series(r)
t["url"] = pd.Series(r1)
t["sentiment of desc"] = pd.Series(s)
t["sentiment of title"] = pd.Series(s1)


t
