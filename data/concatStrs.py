import csv


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


def strings2csv(strings, filePath, encoding="utf-8"):
    keys = strings[0].keys()
    with open(filePath, 'w', newline='',encoding=encoding)  as output_file:
        dict_writer = csv.DictWriter(output_file, keys)
        dict_writer.writeheader()
        dict_writer.writerows(strings)
    return


strings = []

strings += readStringsFromCsv("./sentences123456_no_but.csv",encoding="utf-8")
strings += readStringsFromCsv("./sentences123456_only_but_edited_done.csv",encoding="utf-8")

    


strings2csv(strings,'./review_sentences_with_sentiment.csv')
