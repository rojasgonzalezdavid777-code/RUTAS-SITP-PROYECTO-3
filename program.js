// Crear mapa
let map = L.map("map").setView([4.63, -74.08], 11);

// Capa base
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Variable para guardar la capa
let rutasLayer;

// Evento del menú desplegable
document.getElementById("select").addEventListener("change", function(){

let value = this.value;

// Ir a Suba
if(value.includes(",")){
    let [lat, lng] = value.split(",").map(Number);
    map.flyTo([lat, lng], 13);
}

// Cargar rutas o paraderos SITP1
if(value === "sitp"){

fetch("paradero_zonal.geojson")
.then(response => response.json())
.then(data => {

    // borrar capa anterior
    if(rutasLayer){
        map.removeLayer(rutasLayer);
    }

    // agregar geojson
    rutasLayer = L.geoJSON(data,{
        style:{
            color:"blue",
            weight:2
        }
    }).addTo(map);

    // ajustar mapa al tamaño de los datos
    map.fitBounds(rutasLayer.getBounds());

})
.catch(error => console.log("Error cargando GeoJSON:", error));

}

});