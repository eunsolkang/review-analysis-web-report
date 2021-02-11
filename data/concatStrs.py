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

strings += readStringsFromCsv("./review_seperated_by_sentences1.csv",encoding="cp949")
strings += readStringsFromCsv("./review_seperated_by_sentences2.csv",encoding="cp949")
strings += readStringsFromCsv("./review_seperated_by_sentences3.csv",encoding="latin_1")

strings2csv(strings,'./review_seperated_by_sentences_conclusion.csv')
