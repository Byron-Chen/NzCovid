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
  "#f2f0f7",
  "#cbc9e2",
  "#9e9ac8",
  "#756bb1",
  "#54278f"]
var max_list = [0, 0, 0]//active, deceased, recovered
var city_json;

function init() {
  cases_total_num = city_json[21].active - city_json[20].active
  console.log(cases_total_num)
  console.log(max_list)

  for (city in city_data) {
    //console.log(city_data[city].active / cases_total_num)
    heat_color_num = Math.ceil(city_data[city].active/max_list[0] * 4)
    console.log(heat_color_num)
    document.getElementById(city).setAttribute('style', 'fill:' + heat_color[heat_color_num])


    document.getElementById(city).addEventListener('mouseenter', function (e) {
      e.currentTarget.setAttribute('stroke-width', '1');
      currentcityid = e.currentTarget.getAttribute("id")
      document.getElementById("DHBname").innerHTML = city_data[currentcityid].name + " " + city_data[currentcityid].active;
    });
    document.getElementById(city).addEventListener('mouseleave', function (e) {
      e.currentTarget.setAttribute('stroke-width', '0.1');
    });
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
  console.log(city_json[0].name)
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
  console.log(city_data)

}


window.onload = init;