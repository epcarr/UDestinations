let map;
let savedMarkers = [];
let currentBuildingMarker = null;  // Variable to store the current marker for the building

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

// Function to clear the previous marker and add a new one for the selected building
function visitBuilding(buildingName, location) {
    // If there's already a marker, remove it
    if (currentBuildingMarker) {
        currentBuildingMarker.setMap(null);  // Remove the previous marker from the map
    }

    // Create a new marker for the selected building
    currentBuildingMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: buildingName
    });

    // Center the map on the selected building and zoom in
    map.setCenter(location);
    map.setZoom(18);
}

const buildings = {
    "Alison Hall": { lat: 39.67873805117535, lng: -75.75062836166603 },
    "Alison Hall West": { lat: 39.678524270217046, lng: -75.75116067637826 },
    "Brown Lab": { lat: 39.67970143991899, lng:  -75.75133018566285 },
    "Colburn Lab": { lat: 39.680160289848985, lng: -75.74993764638631 },
    "Carpenter Sports Building": { lat: 39.68429061337597, lng: -75.7518218521466 },
    "Drake Hall": { lat: 39.679754120901855, lng: -75.75072941951787 },
    "DuPont Hall": { lat: 39.68071562726429, lng: -75.7515826529153},
    "Evans Hall": { lat: 39.680185829739614, lng: -75.7512977119051 },
    "Ewing Hall": { lat: 39.68138370641468, lng: -75.75501435936988 },
    "Gore Hall": { lat: 39.680602266858706, lng: -75.7530588540025 },
    "Harker ISE Lab": { lat: 39.67895603910478, lng: -75.748446857146 },
    "Hullihen Hall": { lat: 39.679597969705306, lng:  -75.75289882396227 },
    "Kirkbride Lecture Hall": { lat: 39.6812755519956, lng: -75.75434771907531 },
    "Lerner Hall": { lat: 39.68066674209665, lng: -75.7558414934743 },
    "McDowell Hall": { lat: 39.68392816012537, lng: -75.75457001813923 },
    "Memorial Hall": { lat: 39.67918684703373, lng: -75.75214839554782 },
    "Mitchell Hall": { lat: 39.68009262514897, lng: -75.75319006096672 },
    "Morris Library": { lat: 39.678038629437935, lng: -75.75310455767755 },
    "Old College": { lat: 39.6839757434548, lng: -75.75368788207594 },
    "Penny Hall": { lat: 39.67828513028564, lng: -75.74930709520285 },
    "Pearson Hall": { lat: 39.68016750626128, lng: -75.74865029635602 },
    "Perkins": { lat: 39.676941615090975, lng: -75.7495330731378 },
    "Purnell Hall": { lat: 39.680421311124974, lng: -75.75530652168841 },
    "Recitation Hall": { lat: 39.68354843420127, lng: -75.75325275713652 },
    "Robinson Hall": { lat: 39.6762761956673, lng: -75.75246961768218 },
    "Sharp Lab": { lat: 39.681137291845275, lng:  -75.75288645136263 },
    "Smith Hall": { lat: 39.6806318427531, lng: -75.75418663366268 },
    "Spencer Lab": { lat: 39.680971011564296, lng: -75.74996854760275 },
    "Townsend Hall": { lat: 39.66585668248938, lng: -75.75143344426971 },
    "Trabant": { lat: 39.682381905336165, lng: -75.7542119350803 },
    "Willard Hall": { lat: 39.68348011118033, lng: -75.75514733368128 },
    "Wolf Hall": { lat: 39.681224696526826, lng: -75.75172575610068 }
};

// Update the dropdown options with a click event for each building
function addDropdownOptions() {
    const dropdown = document.getElementById("dropdown-content");
    Object.keys(buildings).forEach(building => {
        const option = document.createElement("a");
        option.href = "#";
        option.innerText = building;
        option.onclick = () => visitBuilding(building, buildings[building]);
        dropdown.appendChild(option);
    });
}

// Function to center the map to the University of Delaware
function centerMap() {
    const universityLocation = { lat: 39.678, lng: -75.7526 };
    map.setCenter(universityLocation);
    map.setZoom(15);
}

// Function to add a saved marker on the map
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

// Call this function after the page loads
window.onload = addDropdownOptions;
