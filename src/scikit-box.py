#this is just the boilerplate code for an ensemble
#the code that is commented out is old vectorizer code that we probably don't need
import pandas as pd
#from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
#the data array hold the features
data = []
data_labels = []
#eventually, we are going to want to have these two 'with' statements point to actual files/dataframes
with open("./pos_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_labels.append('positive_sentiment')

with open("./neg_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_labels.append('negative_sentiment')
'''
vectorizer = CountVectorizer(
    analyzer = 'word',
    lowercase = False,
)
features = vectorize.fit_transform(
    data
)
features_nd = features.toarray()
'''
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
