let map;
let savedMarkers = [];

function initMap() {
    console.log("Initializing map...");
    const universityLocation = { lat: 39.678, lng: -75.7526 };
    
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: universityLocation
    });

    new google.maps.Marker({
        position: universityLocation,
        map: map,
        title: "University of Delaware"
    });

    map.addListener("click", (event) => {
        addSavedMarker(event.latLng);
    });
}

function zoomToTrabant() {
    const trabantLocation = { lat: 39.6822, lng: -75.7541 };
    map.setCenter(trabantLocation);
    map.setZoom(18);
}

function addSavedMarker(location) {
    console.log("Adding marker at:", location);
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "Saved Place",
        draggable: true
    });
    savedMarkers.push(marker);

    const placeName = prompt("Enter a name for this location:", "Saved Place");
    if (placeName) {
        marker.setTitle(placeName);
    }
}

function zoomIn() {
    if (map) {
        map.setZoom(map.getZoom() + 1);
    }
}

function zoomOut() {
    if (map) {
        map.setZoom(map.getZoom() - 1);
    }
}

function centerMap() {
    if (map) {
        map.setCenter({ lat: 39.678, lng: -75.7526 });
    }
}

function showSavedLocations() {
    let locations = savedMarkers.map(marker => marker.getTitle()).join("\n");
    alert("Saved Locations:\n" + (locations || "No locations saved yet."));
}
