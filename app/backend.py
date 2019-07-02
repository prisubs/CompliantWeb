import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def graph_ticker(stats, ticker):
    df = pd.read_csv("{0}-6m-weekly.csv".format(ticker))
    c1, c2 = df[stats[0]], df[stats[1]]
    fig = sns.scatterplot(c1, c2)
    plt.savefig("res.png")
    return "res.png"