#code from twilio blog
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics
data = []
data_labels = []
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
X_train, X_test, y_train, y_test = train_test_split(
    data,
    data_labels,
    test_size=0.3)

instance_of_ensemble = RandomForestClassifier(n_estimators=100)
instance_of_ensemble.fit(X_train, Y_train)

prediction_y = instance_of_ensemble(X_test)

print("Accuracy of our classifier:", metrics.accuracy_score(y_test, prediction_y))
