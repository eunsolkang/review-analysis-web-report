from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException 
import csv

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
        reviewpage = self.webDriver.find_element_by_css_selector('#reviews-medley-footer > div.a-row.a-spacing-medium > a') 
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
    
    link1 = "https://www.amazon.com/Van-Heusen-Pinpoint-Regular-Stripe/dp/B017EUJCJS/ref=sr_1_6?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-6"
    link2 = "https://www.amazon.com/Van-Heusen-Regular-Stretch-X-Large/dp/B07RFN9YXW/ref=sr_1_9?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-9"
    link3 = "https://www.amazon.com/Amazon-Essentials-Regular-Fit-Long-Sleeve-Sleeve/dp/B06XX648KY/ref=sr_1_11?dchild=1&keywords=dress+shirts&qid=1613024659&sr=8-11"

    driver = getWebDriver()

    shirt1 = AmazonProduct(link1)
    shirt1.setWebDriver(driver)
    shirt1.crawlReviews()
    shirt1.reviews2csv("./reviews1.csv")

    
    shirt2 = AmazonProduct(link2)
    shirt2.setWebDriver(driver)
    shirt2.crawlReviews()
    shirt2.reviews2csv("./reviews2.csv")

    
    shirt3 = AmazonProduct(link3)
    shirt3.setWebDriver(driver)
    shirt3.crawlReviews()
    shirt3.reviews2csv("./reviews3.csv")

