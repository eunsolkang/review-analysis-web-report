import re
import string
import pandas as pd
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from nltk import pos_tag, word_tokenize
from nltk.corpus import stopwords
import pickle
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model


import sys
import argparse

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')

def clean_text(text):
    text = str(text).lower()
    text = re.sub('\[.*?\]', '', text)
    text = re.sub('https?://\S+|www\.\S+', '', text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub('\n', '', text)
    text = re.sub('[%s]' % re.escape(string.punctuation), '', text)
    text = re.sub('\w*\d\w*', '', text)
    text = re.sub(r'\s+[a-zA-Z]\s+', ' ', text)
    text = re.sub(r'\s+', ' ', text, flags=re.I)
    return text

def lemmatize_all(sentence):
    wnl = WordNetLemmatizer()
    for word, tag in pos_tag(word_tokenize(sentence)):
        if tag.startswith("NN"):
            yield wnl.lemmatize(word, pos='n')
        elif tag.startswith('VB'):
            yield wnl.lemmatize(word, pos='v')
        elif tag.startswith('JJ'):
            yield wnl.lemmatize(word, pos='a')
        elif tag.startswith('R'):
            yield wnl.lemmatize(word, pos='r')
        else:
            yield word

def remove_stopword(x):   
    return [y for y in x if y == 'not' or y not in stopwords.words('english')]

if(__name__ == "__main__"):
    parser = argparse.ArgumentParser(description="Get token")
    parser.add_argument('-t', dest='token', type=str)
    argData = parser.parse_args(sys.argv[1:])
    token = argData.token
    location = "./tmpData/"+token+"-review_seperated_by_sentences.csv"
    try:
        data = pd.read_csv(location, encoding='utf-8')
       
        data['sentiment'] = data['sentiment'].apply(lambda x:-1)
        
        data['sentence'] = data['sentence'].apply(lambda x:clean_text(x))
        data = data.dropna(axis=0)
        
        data['sentence'] = data['sentence'].apply(lambda x:" ".join(lemmatize_all(str(x))))

        data['x_temp'] = data['sentence'].apply(lambda x:str(x).split())

        data['x_temp'] = data['x_temp'].apply(lambda x:remove_stopword(x))
        data = data.dropna(axis=0)

        with open('../machineLearning/tokenizer.pickle', 'rb') as handle:
            tokenizer = pickle.load(handle)

        predict_data = data['x_temp']
        predict_data = tokenizer.texts_to_sequences(predict_data)

        predict_data = pad_sequences(predict_data, maxlen=22)

        loaded_model = load_model('../machineLearning/review_sentiment_analysis_model.h5')
        prediction = loaded_model.predict(predict_data)

        predicted_labels = np.argmax(prediction, axis=1)
        predicted_labels = pd.DataFrame(predicted_labels)

        data['sentiment']= predicted_labels
        
        labeled_file_name = "./tmpData/"+token+"-review_seperated_by_sentences_labeled.csv"

        data.to_csv(labeled_file_name, columns = ['sentence', 'sentiment'], index=False)
    except Exception as err:
        print('fail')
        print(err)
        exit()
    print('success')
