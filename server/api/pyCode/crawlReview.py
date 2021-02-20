from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException 
import csv
import re
import sys
import argparse

class AmazonProduct:    
    def __init__(self, url):
        self.url = url
        self.reviews = []
        self.reviewStrs = []
        return
    
    def setWebDriver(self, driver):
        self.webDriver = driver
    
    def crawlReviews(self):
        if(hasattr(self,'webDriver') == False):
            print("plz set driver first")
            return
        self.webDriver.get(self.url)
        reviewpage = self.webDriver.find_element_by_css_selector('#reviews-medley-footer > div.a-row.a-spacing-medium > a') #TODO change sometime 
        reviewpage.click()
        while True:
            elems = self.webDriver.find_elements_by_css_selector("div[data-hook='review']")
            for elem in elems:
                score = elem.find_element_by_css_selector("span[class='a-icon-alt']").get_attribute('innerHTML')
                body = elem.find_element_by_css_selector('span[data-hook="review-body"] > span').get_attribute('innerHTML')
                self.reviews.append({'score' : score,'review': body})
            try:
                nextPageBtn = self.webDriver.find_element_by_css_selector("#cm_cr-pagination_bar > ul > li.a-last > a")
            except NoSuchElementException:
                break
            next_url = nextPageBtn.get_attribute("href")
            self.webDriver.get(next_url)

        return


    def reviews2csv(self, filePath):
        keys = self.reviews[0].keys()
        with open(filePath, 'w', newline='')  as output_file:
            dict_writer = csv.DictWriter(output_file, keys)
            dict_writer.writeheader()
            dict_writer.writerows(self.reviews)
        return
    
    def readReviewsFromCsv(self, filePath):
        f = open(filePath,'r')
        rdr = csv.reader(f)
        header = next(rdr)
        for line in rdr:
            reviewDict ={}
            for i in range(len(header)):
                reviewDict[header[i]] = line[i]
            self.reviews.append(reviewDict)
    
    def review2str(self):
        for review in self.reviews:
            reviewStr = review['review']
            reviewStr = reviewStr.replace('<br>','\n')
            reviewStr = reviewStr.replace('.','\n')
            reviewStr = reviewStr.replace('(','\n')
            reviewStr = reviewStr.replace(')','\n')
            reviewStr = reviewStr.replace(';','\n')
            reviewStr = reviewStr.replace('!','\n')
            reviewStr = reviewStr.replace('。','\n')

            strs = reviewStr.split('\n')
           
            resStrs=[]
            but_re = re.compile("(\\b:?but\W|however\W|while\W\\b)")
            for st in strs:
                lower_st = st.lower()
                but_pt = but_re.split(lower_st)
                keep_st=""
                for i in but_pt:
                    if("but" in i or "however" in i or "while" in i):
                        keep_st = i
                    else:
                        res_st = keep_st+i
                        res_st=res_st.strip()
                        if(len(res_st) == 0 or len(res_st) == 1):
                            continue
                        resStrs.append(res_st)
                        keep_st = ""
            

            #strs = [v.strip() for v in strs]    
            #strs = [v for v in strs if len(v) != 0]
            #strs = [v for v in strs if len(v) != 1]
            review['reviewStrs'] = resStrs
        return
    
    def str2csv(self, filePath):
        with open(filePath, 'w', newline='')  as output_file:
            cw = csv.writer(output_file)
            cw.writerow(['sentence','sentiment'])
            for review in self.reviews:
                for reviewStr in review['reviewStrs']:
                    cw.writerow([reviewStr,''])
        return
         


driverPath = '/home/citron0137/kpmg/chromedriver'#TODO put your driver path
def getWebDriver():
    driver = webdriver.Chrome(driverPath) 
    driver.implicitly_wait(3)
    return driver

def getHeadlessWebDriver():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    options.add_argument("user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36")
    driver = webdriver.Chrome(driverPath, options=options) #TODO put your driver path
    driver.implicitly_wait(3)
    return driver

if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description="Get Link and token")
    parser.add_argument('-l', dest='link', type=str)
    parser.add_argument('-t', dest='token', type=str)
    parser.add_argument('-p', dest='platform', type=str)
    argData = parser.parse_args(sys.argv[1:])
    link = argData.link
    token = argData.token
    platform = argData.platform
    if(platform != 'amazon'):
        print("error")
        print("not supported platform")
        exit()
    try:
        #driver = getWebDriver()
        driver = getHeadlessWebDriver()
        product = AmazonProduct(link)
        product.setWebDriver(driver)
        product.crawlReviews()
        product.reviews2csv("./tmpData/"+token+"-reviews.csv")
        product.review2str()
        product.str2csv("./tmpData/"+token+"-review_seperated_by_sentences.csv")
    except Exception as err:
        print("error")
        print(err)
        exit()
    print("success")
    print('successfully done'+token)

