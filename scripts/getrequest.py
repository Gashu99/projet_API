import requests

url = "https://bestbuy-product-data.p.rapidapi.com/bestbuy/"

querystring = {"page":"1","keyword":"home+appliance"}

headers = {
        "X-RapidAPI-Key": "b501e8e05cmsha9812835ee0a462p1c45e6jsn7a85988d3124",
        "X-RapidAPI-Host": "bestbuy-product-data.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
