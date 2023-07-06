from selenium import webdriver
from selenium.webdriver.firefox.options import Options
import csv

options = Options()
options.headless = True  # Exécution en mode headless (sans interface graphique)

# Initialisation du driver Firefox
driver = webdriver.Firefox(options=options)

#Charger une page web
driver.get("https://www.jumia.sn/telephone-tablette/")

data=[]
element=driver.find_elements("css selector",".prd._box._hvr")
i=0
for e in element:
    item={}
    source=e.find_element("tag name","img")
    src=source.get_attribute('data-src')
   
    nom=e.find_element("css selector",".name")
    item["title"]=nom.text
    prix=e.find_element("css selector",".prc")
    item["price"]=prix.text
    item["img"]=src
    if src != "" and nom.text != "" and prix.text != "" :
        data.append(item)
        
#mettre les donnees dans un fichier json
import json 
with open ('donnee_scaper_avec_python.json',"w") as don:
    json.dump(data,don)

