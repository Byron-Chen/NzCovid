from cgitb import small
import requests
import json
from bs4 import BeautifulSoup
from datetime import datetime

def scrape():
    url = "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-data-and-statistics/covid-19-current-cases"
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")
    table_soup = soup.find_all("tbody")[-2]

    city_data = table_soup.find_all("tr")

    city_list = []

    for city_soup in city_data:
        small_d = {}
        found_list = city_soup.find_all("td")
        small_d["name"] = found_list[0].text
        small_d["active"] = found_list[1].text
        small_d["recovered"] = found_list[2].text
        small_d["deceased"] = found_list[3].text
        city_list.append(small_d)
    print(city_list[13])
    
    with open('data.json', 'w') as f:
        json.dump(city_list, f)

    #ab = city_data[0].find_all("td")
    #for bb in ab:
     #  print(bb.text)
    #print(ab)
    #print(city_data)
scrape()