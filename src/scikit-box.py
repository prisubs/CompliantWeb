#code from twilio blog
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
data = []
data_labels = []
with open("./pos_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_labels.append('positive_sentiment')

with open("./neg_tweets.txt") as f:
    for iterate in f:
        data.append(iterate)
        data_lables.append('negative_sentiment')

vectorizer = CountVectorizer(
    analyzer = 'word',
    lowercase = False,
)
features = vectorize.fit_transform(
    data
)
features_nd = features.toarray()

X_train, X_test, y_train, y_test = train_test_split(
    features_nd,
    data_labels,
    train_size=0.80,
    random_state=1234)
