import json
good_data=[]
for occur in clean_data:
    clean_occur = {}
    if occur !={}:
        for key, value in occur.items():
            if key != "couleur" and key != "modèle":
                clean_occur[key] = value
        good_data.append(clean_occur)
    
good_data
with open ("/home/nyto/Documents/scraping/data/dataem2.json", "w") as f:
    f.write(json.dumps(good_data, ensure_ascii = False))
