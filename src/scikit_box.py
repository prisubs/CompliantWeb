#this is just the boilerplate code for an ensemble
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
import requests
#the data array hold the features

#eventually, we are going to want to have these two 'with' statements point to actual files/dataframes
#or simply forgo files and just operate with simple dataframes, which is what I'm probably going to end up doing with this file
'''
def convert_to_dataframe(file_name):
    return pd.read_csv(file_name)
'''
'''
with open("./pos_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_labels.append('positive_sentiment')

with open("./neg_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_labels.append('negative_sentiment')
'''
'''
positive_headlines = pd.read_csv('/positive_sentiment.csv')
negative_headlines = pd.read_csv('/negative_sentiment.csv')

pos_data = positive_headlines.pop('Features').values
neg_data = negative_headlines.pop('Features').values
data.append(pos_data).append(neg_data)

pos_labels = postive_headlines.pop('Labels').values
neg_labels = negative_headlines.pop('Labels').values
data_labels.append(pos_labels).append(neg_labels)
'''

def take_in_data_frame_modify_data_and_labels(df):
    data = []
    data_labels = []
    feature_cols = ['Urls']
    data = df.loc[:, feature_cols]
    data_labels = df.sentiments
    #this call to train_test_split uses cross validation to train our model
    X_train, X_test, y_train, y_test = train_test_split(
        data,
        data_labels,
        test_size=0.3)
    #we create an instance of the random forest classifier, and then fit it to our trained X and Y
    instance_of_ensemble = RandomForestClassifier(n_estimators=100)
    instance_of_ensemble.fit(X_train, Y_train)

    prediction_y = instance_of_ensemble(X_test)
    #this last print should be of a high accuracy!
    print("Accuracy of our classifier:", metrics.accuracy_score(y_test, prediction_y))


#elastic net boilerplate:
'''
from sklearn.linear_model import ElasticNet
regr = ElasticNet(random_state=0)
regr.fit(data, data_labels)
print(regr.coef_)
print(regr.intercept_)
'''
