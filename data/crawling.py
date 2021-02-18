from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException 
import csv
import re
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
         

def getWebDriver():
    driver = webdriver.Chrome('/home/citron0137/kpmg/chromedriver') #put your driver path
    driver.implicitly_wait(3)
    return driver

def getHeadlessWebDriver():
    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    driver = webdriver.Chrome('/home/citron0137/kpmg/chromedriver', options=options) #put your driver path
    driver.implicitly_wait(3)
    return driver

if __name__ == "__main__":
    
    #link1 = "https://www.amazon.com/Van-Heusen-Pinpoint-Regular-Stripe/dp/B017EUJCJS/ref=sr_1_6?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-6"
    #link2 = "https://www.amazon.com/Van-Heusen-Regular-Stretch-X-Large/dp/B07RFN9YXW/ref=sr_1_9?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-9"
    #link3 = "https://www.amazon.com/Amazon-Essentials-Regular-Fit-Long-Sleeve-Sleeve/dp/B06XX648KY/ref=sr_1_11?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-11"

    link4 = "https://www.amazon.com/Van-Heusen-Poplin-Regular-Collar/dp/B009ESZFM2/ref=sr_1_5?crid=3UQKALUSIW2YI&dchild=1&keywords=dress+shirts+for+men&qid=1613098910&sprefix=dress+sh%2Caps%2C365&sr=8-5"
    link5 = "https://www.amazon.com/Van-Heusen-Poplin-Fitted-Collar/dp/B00C86E80W/ref=sr_1_6?crid=3UQKALUSIW2YI&dchild=1&keywords=dress+shirts+for+men&qid=1613099257&sprefix=dress+sh%2Caps%2C365&sr=8-6"
    link6 = "https://www.amazon.com/Coofandy-Casual-Button-Shirts-Medium/dp/B075WQND21/ref=sr_1_7?crid=3UQKALUSIW2YI&dchild=1&keywords=dress+shirts+for+men&qid=1613099257&sprefix=dress+sh%2Caps%2C365&sr=8-7"

    #driver = getWebDriver()

    '''
    shirt1 = AmazonProduct(link1)
    shirt1.setWebDriver(driver)
    shirt1.crawlReviews()
    shirt1.reviews2csv("./reviews1.csv")
    shirt1.review2str()
    shirt1.str2csv("./review_seperated_by_sentences1.csv")
    
    shirt2 = AmazonProduct(link2)
    shirt2.setWebDriver(driver)
    shirt2.crawlReviews()
    shirt2.reviews2csv("./reviews2.csv")
    shirt2.review2str()
    shirt2.str2csv("./review_seperated_by_sentences2.csv")
    
    shirt3 = AmazonProduct(link3)
    shirt3.setWebDriver(driver)
    shirt3.crawlReviews()
    shirt3.reviews2csv("./reviews3.csv")
    shirt3.review2str()
    shirt3.str2csv("./review_seperated_by_sentences3.csv")

    shirt4 = AmazonProduct(link4)
    shirt4.setWebDriver(driver)
    shirt4.crawlReviews()
    shirt4.reviews2csv("./reviews4.csv")
    shirt4.review2str()
    shirt4.str2csv("./review_seperated_by_sentences4.csv")
    
    shirt5 = AmazonProduct(link5)
    shirt5.setWebDriver(driver)
    shirt5.crawlReviews()
    shirt5.reviews2csv("./reviews5.csv")
    shirt5.review2str()
    shirt5.str2csv("./review_seperated_by_sentences5.csv")
    
    shirt6 = AmazonProduct(link6)
    shirt6.setWebDriver(driver)
    shirt6.crawlReviews()
    shirt6.reviews2csv("./reviews6.csv")
    shirt6.review2str()
    shirt6.str2csv("./review_seperated_by_sentences6.csv")
    '''

    shirt = AmazonProduct("#")
    shirt.readReviewsFromCsv("tmpDatas/reviews1.csv")
    shirt.review2str()
    shirt.str2csv("./test.csv")

