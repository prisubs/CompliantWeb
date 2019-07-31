import requests

payload = {
    "ticker": "fb"
}

r = requests.get("localhost:5002/companies/get-prediction", params=payload)
print(r.text)

r = requests.get("localhost:5002/companies/metadata", params=payload)
print(r.text)

r = requests.get("localhost:5002/companies/related", params=payload)
print(r.text)

payload = {
         "ticker": "fb",
         "date": "2019-05-30"
     }

r = requests.get("localhost:5002/analytics/sentiments", params=payload)
print(r.text)

r = requests.get("localhost:5002/analytics/articles", params=payload)
print(r.text)