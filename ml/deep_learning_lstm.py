import pandas as pd

filepath_dict = {'yelp':   'keras_data/yelp_labelled.txt',
                 'amazon': 'keras_data/amazon_cells_labelled.txt',
                 'imdb':   'keras_data/imdb_labelled.txt'}

df_list = []
for source, filepath in filepath_dict.items():
    df = pd.read_csv(filepath, names=['sentence', 'label'], sep='\t')
    df['source'] = source  # Add another column filled with the source name
    df_list.append(df)

df = pd.concat(df_list)
print(df.iloc[0])

from sklearn.model_selection import train_test_split

df_yelp = df[df['source'] == 'yelp']

sentences = df_yelp['sentence'].values
y = df_yelp['label'].values

sentences_train, sentences_test, y_train, y_test = train_test_split(sentences, y, test_size=0.25, random_state=1000)

from sklearn.feature_extraction.text import CountVectorizer

vectorizer = CountVectorizer()
vectorizer.fit(sentences_train)

X_train = vectorizer.transform(sentences_train)
X_test  = vectorizer.transform(sentences_test)

from keras.models import Sequential
from keras import layers
input_dim = X_train.shape[1]  # Number of features

model = Sequential()
model.add(layers.Dense(10, input_dim=input_dim, activation='relu'))
model.add(layers.Dense(1, activation='sigmoid'))

model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

history = model.fit(X_train, y_train, epochs=100, verbose=False,validation_data=(X_test, y_test), batch_size=10)

loss, accuracy = model.evaluate(X_train, y_train, verbose=False)

print("Training Accuracy: {:.4f}".format(accuracy))
loss, accuracy = model.evaluate(X_test, y_test, verbose=False)
print("Testing Accuracy:  {:.4f}".format(accuracy))




import matplotlib.pyplot as plt
plt.style.use('ggplot')

def plot_history(history):
    acc = history.history['acc']
    val_acc = history.history['val_acc']
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    x = range(1, len(acc) + 1)

    plt.figure(figsize=(12, 5))
    plt.subplot(1, 2, 1)
    plt.plot(x, acc, 'b', label='Training acc')
    plt.plot(x, val_acc, 'r', label='Validation acc')
    plt.title('Training and validation accuracy')
    plt.legend()
    plt.subplot(1, 2, 2)
    plt.plot(x, loss, 'b', label='Training loss')
    plt.plot(x, val_loss, 'r', label='Validation loss')
    plt.title('Training and validation loss')
    plt.legend()
    plt.show()

plot_history(history)














'''
import pandas as pd
from string import punctuation
from collections import Counter
import matplotlib.pyplot as plt
import numpy as np

aapldata = pd.read_csv("./data/6m-weekly/aapl-6m-weekly.csv")
corpus_c = aapldata['corpus']
corpus_c = corpus_c.str.lower()
corpus_c = corpus_c.str.replace('[^\w\s]','')
cc_split = corpus_c
print ('Number of reviews :', cc_split.size)
allwords_ = cc_split.str.cat(sep=',')
# create a list of words
all_text2 = ''.join(allwords_)
words = all_text2.split(' ')
# Count all the words using Counter Method
count_words = Counter(words)
total_words = len(words)
sorted_words = count_words.most_common(total_words)
vocab_to_int = {w:i+1 for i, (w,c) in enumerate(sorted_words)}

reviews_int = []
for review in cc_split:
    reviews_int.append([])
#print(cc_split)
i = 0
review_lengths = [0] * cc_split.size
for review in cc_split:
    r = []
    for w in review.split():
        if w in vocab_to_int:
            r.append(vocab_to_int[w])
            review_lengths[i] += 1
    reviews_int[i].append(r)
    i = i + 1

#print (reviews_int[0])
#print("*******")
#print(reviews_int[-1])

encoded_labels = aapldata['sentiment_test']
#reviews_len = [len(x) for x in reviews_int]
#pd.Series(review_lengths).hist()
#plt.show()
#pd.Series(review_lengths).describe()
print(max(review_lengths))
len_feat = len(reviews_int)
for x in range(0, len(reviews_int)):
    if review_lengths[x] < max(review_lengths):
        zeros = [0] * (max(review_lengths) - review_lengths[x])
        reviews_int[x].extend(zeros)
reviews_int2 = []
for x in reviews_int:
    y = np.array(x)
    y.flatten()
    print(y)
    reviews_int2.append(y)
print(reviews_int2)
'''
'''
def pad_features(reviews_int, seq_length):
    features = np.zeros((len(reviews_int), seq_length), dtype = int)

    for i, review in enumerate(reviews_int):
        review_len = len(review)
        if review_len <= seq_length:
            zeroes = list(np.zeros(seq_length-review_len))
            new = zeroes+review
        elif review_len > seq_length:
            new = review[0:seq_length]
        features[i,:] = np.array(new)
    #print (features[:10,:])
    return features
pad_features(reviews_int, max(review_lengths))
'''
'''
split_frac = 0.8
train_x = reviews_int[0:int(split_frac*len_feat)]
train_y = encoded_labels[0:int(split_frac*len_feat)]
remaining_x = reviews_int[int(split_frac*len_feat):]
remaining_y = encoded_labels[int(split_frac*len_feat):]
valid_x = remaining_x[0:int(len(remaining_x)*0.5)]
valid_y = remaining_y[0:int(len(remaining_y)*0.5)]
test_x = remaining_x[int(len(remaining_x)*0.5):]
test_y = remaining_y[int(len(remaining_y)*0.5):]
'''
