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

strings += readStringsFromCsv("./review_seperated_by_sentences4.csv",encoding="utf-8")
strings += readStringsFromCsv("./review_seperated_by_sentences5.csv",encoding="utf-8")
strings += readStringsFromCsv("./review_seperated_by_sentences6.csv",encoding="utf-8")

cnt = len(strings)
print(cnt)
strings2csv(strings[:cnt//6], './distributed_sentences1.csv')
strings2csv(strings[cnt//6:cnt//6*2], './distributed_sentences2.csv')
strings2csv(strings[cnt//6*2:cnt//6*3], './distributed_sentences3.csv')
strings2csv(strings[cnt//6*3:cnt//6*4], './distributed_sentences4.csv')
strings2csv(strings[cnt//6*4:cnt//6*5], './distributed_sentences5.csv')
strings2csv(strings[cnt//6*5:], './distributed_sentences6.csv')
