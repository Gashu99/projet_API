from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from pprint import pprint as pp
import pyshorteners
import json
type_tiny = pyshorteners.Shortener()
data = []
driver = webdriver.Firefox()
driver.get("https://www.mda-electromenager.com/fr/recherche?q=lave+linge")
elements = driver.find_elements(By.CSS_SELECTOR, "div.col-12.col-sm-6.col-md-3.mb-3")
for element in elements:
    obj = {}
    obj["nom"] = element.find_element(By.CLASS_NAME, "article-name").text
    try:    
        obj["note"] = element.find_element(By.CLASS_NAME, "customers-reviews").text
        obj["note"] = obj["note"].replace("\n", "")
    except:
        obj["note"] = "no review" 
    obj["prix"] = element.find_element(By.CLASS_NAME, "article-price").text
    obj["image"] = type_tiny.tinyurl.short(element.find_element(By.CSS_SELECTOR, "img").get_attribute("src"))
    obj["image"] = element.find_element(By.CSS_SELECTOR, "img").get_attribute("src")
    data.append(obj)

jsonData = json.dump(data, ensure_ascii=False)
driver.close()
with open("/home/nyto/Documents/scraping/data/dataem1.json", 'w', encoding='utf-8') as file:
    file.write(jsonData)
pp(data)
