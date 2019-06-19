import pandas as pd
import numpy as np

def load_clean(path):
	DESIRED = ["Date", "Open", "Close", "High", "Low", "Volume", "Average", "Ticker"]
	df = pd.read_csv(path)
	df = df[DESIRED]
	return df

# returns all company dataframes in the following order
# copy and paste the example usage command below
# AAPL, AMZN, BABA, CRM, FB, GOOGL, MSFT, NFLX, TSLA, WMT = load_training_data()
# gives all ten dataframes
def load_training_data():
	fn = ["data/original/AAPL.csv", "data/original/AMZN.csv", "data/original/BABA.csv", 
	"data/original/CRM.csv", "data/original/FB.csv", "data/original/GOOGL.csv", "data/original/MSFT.csv", 
	"data/original/NFLX.csv", "data/original/TSLA.csv", "data/original/WMT.csv"]

	return load_clean(fn[0]), load_clean(fn[1]), load_clean(fn[2]), load_clean(fn[3]), load_clean(fn[4]), load_clean(fn[5]), load_clean(fn[6]), load_clean(fn[7]), load_clean(fn[8]), load_clean(fn[9])