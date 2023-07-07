import json
import pyshorteners
with open ("dataem1.json") as f:
    dataem1 = json.load(f)
with open ("dataem3.json") as f:
    dataem3 = json.load(f)
with open ("dataem2.json") as f:
    dataem2 = json.load(f)
locations = []
for occur in dataem3[150:163]:
    locations.append(occur["location"])
for i in range (len(dataem2)):
    dataem2[i]["location"] = locations[i]

rm = ["$",",","."]
tabprix = []
for d in dataem1:
    prix = (str(int(int(d["prix"].split("€")[0])*658.33)) + " CFA")
    tabprix.append(prix)

for i in range (len(dataem1)):
    if "€" in dataem1[i]["prix"]:
        dataem1[i]["prix"] = tabprix[i]
for d in dataem2:
    tabprix.append(str(int(d["prix"].split(".")[0].replace("$","").replace(",",""))*605) + " CFA")
for i in range (len(dataem2)):
    if "$" in dataem2[i]["prix"]:
        dataem2[i]["prix"] = tabprix[i]
dataem1et2 = dataem1 + dataem2
for d in dataem1et2:
    cd = {k : v for k,v in d.items() if k != "note"}

cdem3 = []
type_tiny = pyshorteners.Shortener()
for d in dataem3:
    occur = {}
    image    =  d["image"]
    location = d["location"]
    nom      = d["title"]
    prix     = d["price"][:-3].replace(" ","")
    
#    print((int(prix)))
    if prix[0].isnumeric() and int(prix) > 200000 and "Congélateur" not in nom and "laver" not in nom :
        occur ["image"] = short_url = type_tiny.tinyurl.short(image)    
        occur ["location"] = location 
        occur ["nom"] = nom      
        occur ["prix"] = prix + " CFA"     
    if occur != {}:
        cdem3.append(occur)

data = []
data = cdem3 + dataem1et2
with open("/home/nyto/Documents/scraping/data/data.json", "w") as f:
    f.write(json.dumps(data, ensure_ascii=False))
