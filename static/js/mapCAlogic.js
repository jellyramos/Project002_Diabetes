var map = L.map("map_CA", {
    // 36.7783° N, 119.4179° W
    center: [36.7783, -119.4179],
    zoom: 6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(map);

var counties = "static/data/county-subdivision.geojson";

var mapStyle = {
    color: "white",
    fillColor: "#FF5733",
    fillOpacity: 0.5,
    weight: 1.5
};

d3.json(counties, function(data) {
    L.geoJson(data, {
        style: mapStyle
    }).addTo(map);
});