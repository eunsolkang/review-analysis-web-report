import csv
from wordcloud import *
import matplotlib.pyplot as plt
import random
import sys
import argparse
def readStringsFromCsv(filePath, encoding="utf-8"):
    f = open(filePath,'r', encoding=encoding)
    rdr = csv.reader(f)
    header = next(rdr)
    res = []
    for line in rdr:
        reviewDict ={}
        for i in range(len(header)):
            reviewDict[header[i]] = line[i]
        res.append(reviewDict)

    return res

def divideStrings(strings):
    keyStrs = ""
    proStrs = ""
    conStrs = ""
    for string in strings:
        st = string["sentence"].lower()
        keyStrs += str(st)
        if(string["sentiment"] == '1'):
            proStrs += st
        elif(string["sentiment"] == '2'):
            conStrs += st
    return proStrs,conStrs,keyStrs

def saveWordCloud(
        strings, 
        filepath, 
        background_color = "white", 
        color = None,
        stopwords = STOPWORDS
        ):
    wc = WordCloud(
            width = 800, height =400,
            max_words=1000,
            stopwords=stopwords,
            background_color=background_color
            ).generate_from_text(strings)
    if(color):
        wc.recolor(color_func=get_single_color_func(color), random_state=3)
    wc.to_file(filepath)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Get token")
    parser.add_argument('-t', dest='token', type=str)
    argData = parser.parse_args(sys.argv[1:])
    token = argData.token
    location = "./tmpData/"+token+"-review_seperated_by_sentences_labeled.csv"

    
    strings = readStringsFromCsv(location)

    proStrs,conStrs,allStrs = divideStrings(strings)
    stwords = set(STOPWORDS)
    cststwords = ["really", "will", "time", "one", "way", "bit"]
    cststwords += ["good", "great", "love", "perfect","shirt", "shirts","nice"]
    cststwords += ["happy", "loves", "excellent"]
    cststwords += ["disappointed", "bad", "wrong", "poor"]
    stwords = stwords.union(cststwords)
    saveWordCloud(allStrs,"./tmpData/"+token+"-allWC.png", stopwords=stwords)
    saveWordCloud(proStrs,"./tmpData/"+token+"-proWC.png", stopwords=stwords, color = 'blue' )
    saveWordCloud(conStrs,"./tmpData/"+token+"-conWC.png", stopwords=stwords, color = 'red')
    print("success")
    print("./tmpData/"+token+"-allWC.png")
    print("./tmpData/"+token+"-proWC.png")
    print("./tmpData/"+token+"-conWC.png")
