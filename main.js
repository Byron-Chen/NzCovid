var city_data = {
  auckland: {
    name: "Auckland"
  },
  bayofplenty: {
    name: "Bay of Plenty"
  },
  canterbury: {
    name: "Canterbury"
  },
  capitalandcoast: {
    name: "Capital and Coast"
  },
  countiesmanukau: {
    name: "Counties Manukau"
  },
  hawkesbay: {
    name: "Hawke's Bay"
  },
  huttvalley: {
    name: "Hutt Valley"
  },
  lakes: {
    name: "Lakes"
  },
  midcentral: {
    name: "Mid Central"
  },
  nelsonmarlborough: {
    name: "Nelson Marlborough"
  },
  northland: {
    name: "Northland"
  },
  southcanterbury: {
    name: "South Canterbury"
  },
  southern: {
    name: "Southern"
  },
  tairawhiti: {
    name: "Tairāwhiti"
  },
  taranaki: {
    name: "Taranaki"
  },
  waikato: {
    name: "Waikato"
  },
  wairarapa: {
    name: "Wairarapa"
  },
  waitemata: {
    name: "Waitematā"
  },
  westcoast: {
    name: "West Coast"
  },
  whanganui: {
    name: "Whanganui"
  }
}

var heat_color = [
  ["#f2f0f7", "#edf8fb", "#f1eef6"],
  ["#cbc9e2", "#b2e2e2", "#bdc9e1"],
  ["#9e9ac8", "#66c2a4", "#74a9cf"],
  ["#756bb1", "#2ca25f", "#2b8cbe"],
  ["#54278f", "#006d2c", "#045a8d"]]
var max_list = [0, 0, 0]//active, deceased, recovered
var city_json;

function init() {
  document.getElementById("updated").innerHTML = city_json[22]["updated"]

  for (city in city_data) {
    heat_color_num = Math.ceil(city_data[city].active/max_list[0] * 4)
    document.getElementById(city).setAttribute('style', 'fill:' + heat_color[heat_color_num][0])


    document.getElementById(city).addEventListener('mouseenter', function (e) {
      e.currentTarget.setAttribute('stroke-width', '1');
      currentcityid = e.currentTarget.getAttribute("id")
      document.getElementById("DHBname").innerHTML = city_data[currentcityid].name
      document.getElementById("DHBactive").innerHTML = "Active: " + city_data[currentcityid].active
      document.getElementById("DHBrecovered").innerHTML = "Recovered: " + city_data[currentcityid].recovered
      document.getElementById("DHBdeceased").innerHTML = "Deceased: " + city_data[currentcityid].deceased
    });
    document.getElementById(city).addEventListener('mouseleave', function (e) {
      e.currentTarget.setAttribute('stroke-width', '0.1');
    });
  }

  document.getElementById("active_button").addEventListener('click', function() {change_color(0) })
  document.getElementById("recovered_button").addEventListener('click', function(){change_color(1)})
  document.getElementById("deceased_button").addEventListener('click', function(){change_color(2)})
}

function change_color(category){
  for (city in city_data){
    if(category == 0){
      heat_color_num = Math.ceil(city_data[city].active/max_list[0] * 4)
    }else if(category == 1){
      heat_color_num = Math.ceil(city_data[city].recovered/max_list[1] * 4)
    }else if(category == 2){
      heat_color_num = Math.ceil(city_data[city].deceased/max_list[2] * 4)
    }
    document.getElementById(city).setAttribute('style', 'fill:' + heat_color[heat_color_num][category])
  }
}

function change_max(active, deceased, recovered) {
  if (active > max_list[0]) { max_list[0] = active;}
  if (deceased > max_list[1]) { max_list[1] = deceased }
  if (recovered > max_list[2]) { max_list[2] = recovered }
}


let request = new XMLHttpRequest();
request.open('GET', 'data.json')
request.responseType = 'json'
request.send();
request.onload = function () {
  city_json = request.response;
  for (city in city_json) {
    for (dcity in city_data) {
      if (city_json[city].name == city_data[dcity].name) {
        city_data[dcity]["active"] = parseInt(city_json[city].active)
        city_data[dcity]["recovered"] = parseInt(city_json[city].recovered)
        city_data[dcity]["deceased"] = parseInt(city_json[city].deceased)

        change_max(city_data[dcity]["active"], city_data[dcity]["recovered"], city_data[dcity]["deceased"])


      }
    }

  }

}


window.onload = init;