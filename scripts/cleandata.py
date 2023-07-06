import subprocess
import pyshorteners

type_tiny = pyshorteners.Shortener()

openimg = ["sh", "/tmp/openimg.sh", ""]
# echo "firefox \$@" > /tmp/openimg.sh

clean_data = []

for field in data:
    champ = {}
    tab = field["title"].split()
    tab = [t for t in tab if t != "-"]
    title = " ".join(tab[:6])
    short_url = type_tiny.tinyurl.short(field["image_url"])
    openimg[2] = short_url
    print(title)
    subprocess.call(openimg)
    print("Supprimer? 'o' pour oui, rien pour Garder")
    supprimer = input()
    if supprimer == "o":
        print(title, " : ", short_url)
        print("Supprimé!")
    elif supprimer == "":
        print(title, " : ", short_url)
        champ["nom"] = title
        champ["couleur"] = field["color"]
        champ["modèle"] = field["model_number"]
        champ["image"] = short_url
        champ["prix"] = field["price"]
        champ["note"] = field["rating"]
        print("Gardé!")
    clean_data.append(champ)
    print("----------------------------------------")

print(clean_data)
