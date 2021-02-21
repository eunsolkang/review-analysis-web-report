import pandas as pd
import numpy as np
import re
import string
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import json
import argparse
import sys



parser = argparse.ArgumentParser(description="Get token")
parser.add_argument('-t', dest='token', type=str)
argData = parser.parse_args(sys.argv[1:])
token = argData.token
location = "./tmpData/"+token+"-review_seperated_by_sentences_labeled.csv"


df = pd.read_csv(location)


'''
Make text lowercase, remove text in square brackets, remove links, remove HTML tags,
remove punctuation, remove words containing numbers, remove all single characters, 
and substitute multiple spaces with single space.
'''
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



df['cleaned'] = df['sentence'].apply(lambda x:clean_text(x))



# delete row with missing values
df['cleaned'].replace('', np.nan, inplace=True)
df = df.dropna(axis=0)



corpus = []


for words in df['cleaned']:
    corpus.append(words.split())



word2vec_model = Word2Vec(corpus, size = 64, min_count = 2)



def vectors(document_list):
    document_embedding_list = []
    for line in document_list:
        doc2vec = None
        count = 0
        for word in line.split():
            if word in word2vec_model.wv.vocab:
                count += 1
                # Add vector values of all words in the document
                if doc2vec is None:
                    doc2vec = word2vec_model[word]
                else:
                    doc2vec = doc2vec + word2vec_model[word]

        if doc2vec is not None:
            # Divide the vector of all the word vectors by the length of the document
            doc2vec = doc2vec / count
            document_embedding_list.append(doc2vec)


    # Returns a list of document vectors for each document
    return document_embedding_list



# List of keywords you want to analyze in detail
keywords = ['fit', 'color', 'material']


keyword_embedding_list = vectors(keywords)
document_embedding_list = vectors(df['cleaned'])



cosine_similarities = cosine_similarity(keyword_embedding_list, document_embedding_list)



def most_relevant_review(review_num):
    for keyword_index in range(len(keywords)):
        sim_scores = list(enumerate(cosine_similarities[keyword_index]))
        sim_scores = sorted(sim_scores, key = lambda x: x[1], reverse = True)
        sim_scores = sim_scores[0:review_num]


        # indices of most relevant reviews
        indices = [i[0] for i in sim_scores]
        
        keyword = keywords[keyword_index]
        keyword_reviews = []
        for index in indices:
            review = dict()
            review['id'] = index
            review['sentence'] = df['sentence'].iloc[index]
            review['sentiment'] = df['sentiment'].iloc[index]
            keyword_reviews.append(review)
            
        relevant_reviews[keyword] = keyword_reviews



relevant_reviews = dict()
most_relevant_review(5)


class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)

print('success')
#print(relevant_reviews)
print(json.dumps(relevant_reviews,cls=NpEncoder))
'''
# save into json
with open('./relevant_reviews.json', 'w', encoding='utf-8') as make_file:
        json.dump(relevant_reviews, make_file, indent="\t")
'''


