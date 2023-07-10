import json 

with open ("donnee_scaper_avec_python.json","r") as f1:
    d1=json.load(f1)


with open ("donnees_recuperer_API.json","r") as f2:
    d2=json.load(f2)
i=0
combined_data=[]
for dataset in [d1,d2]:
    for item in dataset:
        combined_item = {"image": item.get("img"), "title": item.get("title"), "price": item.get("price")}
        combined_data.append(combined_item)
       

for d in combined_data:
    print(d)
    i=i+1

print(i)
with open ("donnee_electronique.json","w") as file:
    json.dump(combined_data,file)