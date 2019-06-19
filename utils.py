import pandas as pd
import numpy as np
import datetime

def load_clean(path):
    DESIRED = ["Ticker","Start", "End", "Open", "Close", "High", "Low", "Volume", "Average"]
    df = pd.read_csv(path)
    df["Ticker"] = df["Ticker"].apply(lambda t: t[9:])
    df = fix_dates(df)
    df = df[DESIRED]
    return df

def fix_dates(df):
    df["Date"] = df["Date"].apply(lambda x: pd.to_datetime(x, infer_datetime_format=True))
    df["Start"] = df["Date"].apply(str)
    # now need to calculate the end
    six_days = lambda start_date: start_date + datetime.timedelta(days=6)
    df["End"] = df["Date"].apply(six_days).apply(str)
    df = df.drop(columns=["Date"])
    remove_time = lambda dt: dt[0:10]
    df["Start"] = df["Start"].apply(remove_time)
    df["End"] = df["End"].apply(remove_time)
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