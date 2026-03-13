const map = L.map("map").setView([4.63, -74.08], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let rutasLayer;

document.getElementById("select-location").addEventListener("change", function() {
    const value = this.value;

    if (value.includes(",")) {
        const coords = value.split(",").map(Number);
        map.flyTo(coords, 13);
    }

    if (value === "sitp") {
        fetch("paradero_zonal.geojson")
            .then(res => res.json())
            .then(data => {
                if (rutasLayer) {
                    map.removeLayer(rutasLayer);
                }

                rutasLayer = L.geoJSON(data, {
                    style: {
                        color: "blue",
                        weight: 2
                    }
                }).addTo(map);

                map.fitBounds(rutasLayer.getBounds());
            })
            .catch(err => console.log(err));
    }
});