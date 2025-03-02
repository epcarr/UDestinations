let map, infoWindow;
let savedMarkers = [];
let currentBuildingMarker = null;  // Variable to store the current marker for the building
let building = ''; // Variable to store the building name
let Events = ''; // Variable to store the events in the building

// EVENTS FOR BUILDINGS
const buildingEvents = {
    "Alison Hall": [],
    "Alison Hall West": [],
    "Brown Lab": [],
    "Bob Carpenter Center": [],
    "Colburn Lab": [],
    "Carpenter Sports Building": [['ELI Basketball Shootaround','<br>&nbsp; &nbsp; 3/6/25','2-3:30pm'], ['Top Hen Challenge - 500m row',' <br>&nbsp; &nbsp; 3/10/25','6am-11pm']],
    "Drake Hall": [],
    "Ewing": [],
    "DuPont Hall": [],
    "Evans Hall": [["Microelectriconics Community Science Days","<br>&nbsp;&nbsp; 3/22/25","9:15am-12:30pm"]],
    "Ewing Hall": [],
    "Gore Hall": [['Heaven Can You Hear Me?','<br>&nbsp; &nbsp; 3/3/25','7pm-9pm'],["Prohibited Substances","<br>&nbsp; &nbsp; 3/6/25","12:40-1:35pm"]],
    "Harker ISE Lab": [],
    "Hullihen Hall": [],
    "Kirkbride Lecture Hall": [],
    "Lerner Hall": [],
    "McDowell Hall": [],
    "Memorial Hall": [['Gobsmacked!','<br>&nbsp; &nbsp; 3/4/25','5:30pm-6:45pm'],['Documentary Poetry','<br>&nbsp; &nbsp; 3/13/25','4pm-6pm']],
    "Mitchell Hall": [],
    "Morris Library": ["Honestly Abe","Transcendent Resilience"],
    "Old College": [["Colors of Old College",' <br>&nbsp; &nbsp; 3/2/25','']],
    "Penny Hall": ["Minerals from China and India","Sculptural Copper Saved from the Smelter"],
    "Pearson Hall": [],
    "Purnell Hall": [],
    "Perkins": [["Open Arcade", "<br>&nbsp; &nbsp;  3/3/25 - 3/4/25 ","12-11pm"], ["Geek Week"," <br>&nbsp; &nbsp;3/4/25","7pm"], ["Movie: Star Trek", " <br>&nbsp; &nbsp;3/5/25", "8:30-10:30pm"]],
    "Recitation Hall": [["Colors, Land, and Building"," <br>&nbsp; &nbsp;3/2/25",""]],
    "Robinson Hall": [],
    "Sharp Lab": [["CIS Seminar: Wenjing Lou, Ph.D."," <br>&nbsp; &nbsp; 3/14/25","11:30am"],["CIS Seminar: Adam Perer, Ph.D."," <br>&nbsp; &nbsp; 3/21/25","11:30am"]],
    "Smith Hall": [],
    "Spencer Lab": [],
    "Townsend Hall": [],
    "Trabant": [["An Evening with John Cho"," <br>&nbsp; &nbsp; 3/3/25","5pm"],["Lego Fest"," <br>&nbsp; &nbsp; 3/4/25", "11am to 2pm"],["Band of the Bands","<br>&nbsp; &nbsp; 3/8/25","10:00pm-1:00am"]],
    "Willard Hall": [],
    "Wolf Hall": []
};

// Function to handle building events
function buildingEvent(currentBuilding) {
    let eventList = buildingEvents[currentBuilding];
    Events = `Events in: ${currentBuilding}`;

    let eventDetails = '';

    if (!eventList || eventList.length === 0) {
        eventDetails = '<li>No events available</li>';
    } else if (Array.isArray(eventList[0])) {
        eventDetails = eventList.map(event => `<li>${event[0]} - ${event[1]} (${event[2]})</li>`).join('');
    } else {
        eventDetails = eventList.map(event => `<li>${event}</li>`).join('');
    }

    const eventsTab = document.getElementById("events-tab");
    if (eventsTab) {
        eventsTab.innerHTML = `
            <h2>${Events}</h2>
            <ul>${eventDetails}</ul>`;
    } else {
        console.error("events-tab element not found!");
    }
}

// Initialize the map and add geolocation button
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

    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    map.addListener("click", (event) => {
        addSavedMarker(event.latLng);
    });
}

// Handle geolocation error
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}

// Function to clear the previous marker and add a new one for the selected building
function visitBuilding(buildingName, location) {
    if (currentBuildingMarker) {
        currentBuildingMarker.setMap(null);
    }

    currentBuildingMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: buildingName
    });

    map.setCenter(location);
    map.setZoom(18);

    buildingEvent(buildingName);
}

// Building locations
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
    "Memorial Hall": { lat: 39.67918684703373, lng: -75.75214839554782 },
    "Perkins": { lat: 39.676941615090975, lng: -75.7495330731378 },
    "Trabant": { lat: 39.682381905336165, lng: -75.7542119350803 },
};

// Update dropdown options with a click event for each building
function addDropdownOptions() {
    const dropdown = document.getElementById("dropdown-content");
    dropdown.innerHTML = ""; // Clear previous options

    Object.keys(buildings).forEach(building => {
        const option = document.createElement("a");
        option.href = "#";
        option.innerText = building;
        option.onclick = (event) => {
            event.preventDefault();
            visitBuilding(building, buildings[building]);
        };
        dropdown.appendChild(option);
    });
}

// Function to center the map to the University of Delaware
function centerMap() {
    const universityLocation = { lat: 39.678, lng: -75.7526 };
    map.setCenter(universityLocation);
    map.setZoom(15);
}

// Call this function after the page loads
document.addEventListener("DOMContentLoaded", () => {
    addDropdownOptions();
    initMap();
});

// Coordinates for UD Health Services
const udHealthServices = { lat: 39.6753, lng: -75.7517 };

document.getElementById("student-health").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default behavior of the link

    map.setCenter(udHealthServices);
    map.setZoom(18);  // Adjust zoom level if necessary

    new google.maps.Marker({
        position: udHealthServices,
        map: map,
        title: "UD Health Services"
    });
});
