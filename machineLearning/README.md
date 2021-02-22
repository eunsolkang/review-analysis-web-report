## Getting started
#### 1. Create (and activate) a new environment with Python 3.8
- Linux or Mac:
```
conda create --name troper python=3.8
source activate troper
```

- Windows:
```
conda create --name troper python=3.8
activate troper
```

#### 2. Clone repository to local PC
```
git clone https://github.com/eunsolkang/review-analysis-web-report.git
cd review-analysis-web-report 
```

#### 3. Install requirements
```
pip install -r requirements.txt
```
<br/>

## Information
```
│  keyword_related_review_search.ipynb
│  README.md
│  requirements.txt
│  review_sentiment_analysis.ipynb
│  review_sentiment_analysis_model.h5
│  review_sentiment_prediction.ipynb
│  tokenizer.pickle
│
└─.ipynb_checkpoints
        keyword_related_review_search-checkpoint.ipynb
        review_sentiment_analysis-checkpoint.ipynb
        review_sentiment_prediction-checkpoint.ipynb
```

- #### ``` review_sentiment_analysis.ipynb```:

Load crawled reviews from e-commerce platform.  ```assets/review_sentences_with_sentiment.csv``` was used to train this model.

> ``` review_sentences_with_sentiment.csv```: This is a sentence-by-sentence dataset of the shirt reviews crawled from Amazon. It has approximately 15,000 review sentences.
Sentiment labeling of each review was done as a preprocessing.

**Preprocessing**
- Cleaning the Corpus
- Lemmatization 
- Tokenizing Data
- Removing Stopwords
- One-hot Encoding
- Data Splitting : 20% of data is used as a test set
- Integer Encoding
- Padding

**Model Development**

 We developed a model that analyze sentiment of reviews, and labels positive, negative, and neutral. 
 
 Label sentiment as ```0: neutral / 1: positive / 2: negative```.
 
Use sequential model and add LSTM layers to train model. There should be 3 outputs at the end. Therefore I added a layer with 3 outputs at the end.

Since it is a single label multi classification, softmax is used as the activation function of the last layer, and categorical_crossentropy is used as the loss function. 

If validation_loss does not decrease more than 5 times, it is considered a sign of overfitting and terminates model training early.

-----

- #### ``` review_sentiment_analysis_model.h5```:

It is a model developed with ```review_sentiment_analysis.ipynb```.

While training, the model with the highest accuracy for the validation set was saved.

-----

- #### ``` tokenizer.pickle```: 
This is a tokenizer made by ``` review_sentiment_analysis.ipynb```.

----

- #### ``` review_sentiment_prediction.ipynb```:

It is a module that predicts sentiment for reviews that have been crawled.

**Preprocessing**
- Cleaning the Corpus
- Lemmatization 
- Tokenizing Data
- Removing Stopwords
- One-hot Encoding
- Integer Encoding
- Padding

**Prediction**

Use ``` review_sentiment_analysis_model.h5``` to predict the sentiment of the review.

-----

- #### ```keyword_related_review_search.ipynb```:

Load review data and do text cleaning.

Do word embedding with word2vec. 

Find the mean of word vectors to create document vectors.

Find the cosine similarity between the entire review and the keyword for which you are interested in related reviews.

The n reviews most relevant to selected keywords are selected and saved.
