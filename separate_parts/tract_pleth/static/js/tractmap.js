// Create variable pointing to json file
let url = "static/data/sac2.json";
let myMap;

d3.json(url, function(data) {
  
// Filter for Sacramento Six-County Region or Sacramento County Data
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });

  // Function to assign tract color by high % of population
// characteristics (e.g., high-percentage low-educational attainment, )
  function getColor(d) {
    return d > 30 ? '#88419d' :
    d > 15  ? '##8c96c6' :
    d > 5  ? '#b3cde3' :
    '#edf8fb';
};

function style(feature) {
  return {
      weight: 2,
      opacity: 1,
      fillOpacity: .7,
      fillColor: getColor(feature.properties.LESS_NINTH),
      color: "white",
      // stroke: true,
     
    };
  };

function sacData(feature) {
  var c = feature.properties.COUNTYFP
  // if (c === "017" || c === "067" || c === "061" || c === "101"|| c === "113" || c === "115") return true
  if (c === "067") return true
};

function createFeatures(map_features) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature, layer) {
        // bind pop-up data to each feature;  
        layer.bindPopup("<h3>" + feature.properties.TRACT_NAME + 
        "</h3><hr><p>% Less than 9th Grade: " + feature.properties.LESS_NINTH + 
        "</p><p>% Less than High School: " + feature.properties.LESS_HS + 
        "</p><p>% Black: " + feature.properties.BLACK + 
        "</p><p>% Latino: " + feature.properties.LATINO + "</p>");  
    } 
  

// Create a GeoJSON layer containing the features array on the object
  // Run the onEachFeature function once for each piece of data in the array
  // let lessHS = L.geoJSON(map_features, {
  //   filter: sacData,
  //   style: function style(feature) {
  //     return {
  //         weight: 2,
  //         opacity: 1,
  //         fillOpacity: .7,
  //         fillColor: getColor(feature.properties.LESS_HS),
  //         color: "white",
  //         // stroke: true,
         
  //       };
  //     },
  //   onEachFeature: onEachFeature
  // });

  let lessNinth = 
  L.geoJSON(map_features, {
    filter: sacData,
    style: style,
    onEachFeature: onEachFeature
  });

let dataLayers = L.layerGroup([lessNinth]);
  
  // Sending layer to the createMap function
  createMap(dataLayers);
}

function createMap(dataLayers) {

    // Define streemap and darkmap layers
    // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define basemaps object to hold base layer
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  let overlayMaps = {
    // "less than high school" : dataLayers,
    "less than 9th grade" : dataLayers

    // "less than 9th grade" : layers
  };

 // Create our map, giving it the streetmap and map_features layers to display on load
 var myMap = L.map("map", {
    center: [38.5815719, -121.4943996],
    zoom: 10,
    layers: [streetmap, dataLayers]
  }); 

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    // collapsed: false
  }).addTo(myMap);


// This curly brace below closes the createMap function    

// Create custom legend control
let legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    let div = L.DomUtil.create('div', 'info legend'),
        popscale = [5, 15, 30],
        labels = [];


div.innerHTML += "<p>Legend<hr></p>"
    // loop through earthqake data generate 
    for (var i = 0; i < popscale.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(popscale[i] + 1) + '"></i> ' +
            popscale[i] + (popscale[i + 1] ? '&ndash;' + popscale[i + 1] + '<br>' : '+');
    }

    return div;
    // legend.addTo(myMap);
};

legend.addTo(myMap);
// Closing curly brace for createMap function

}
