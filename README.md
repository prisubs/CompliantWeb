# Setup Instructions
```pip install pandas numpy newsapi-python tweepy```

This will give you ten dataframes of training data. 
```python
from utils import *
AAPL, AMZN, BABA, CRM, FB, GOOGL, MSFT, NFLX, TSLA, WMT = load_training_data()
```



# Tickers
| Company    | Ticker                          |
|------------|---------------------------------|
| Apple      | AAPL                            |
| Salesforce | CRM                             |
| Microsoft  | MSFT                            |
| Google     | GOOGL [Class A]                 |
| Amazon     | AMZN                            |
| Facebook   | FB                              |
| Netflix    | NFLX                            |
| Tesla      | TSLA                            |
| Alibaba    | BABA                            |
| Walmart    | WMT                             |

