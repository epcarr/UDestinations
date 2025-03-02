let map;
let savedMarkers = [];
let currentBuildingMarker = null;  
let building = ''; 
let Events = '';  

// === BUILDING EVENTS ===
const buildingEvents = {
    "Alison Hall": [],
    "Alison Hall West": [],
    "Brown Lab": [],
    "Bob Carpenter Center": [],
    "Colburn Lab": [],
    "Carpenter Sports Building": [
        ['ELI Basketball Shootaround', '<br>&nbsp; &nbsp; 3/6/25', '2-3:30pm'],  
        ['Top Hen Challenge - 500m row', '<br>&nbsp; &nbsp; 3/10/25', '6am-11pm']
    ],
    "Drake Hall": [],
    "DuPont Hall": [],
    "Evans Hall": [["Microelectronics Community Science Days", "<br>&nbsp;&nbsp; 3/22/25", "9:15am-12:30pm"]],
    "Gore Hall": [
        ['Heaven Can You Hear Me?', '<br>&nbsp; &nbsp; 3/3/25', '7pm-9pm'],
        ["Prohibited Substances", "<br>&nbsp; &nbsp; 3/6/25", "12:40-1:35pm"]
    ],
    "Memorial Hall": [
        ['Gobsmacked!', '<br>&nbsp; &nbsp; 3/4/25', '5:30pm-6:45pm'],
        ['Documentary Poetry', '<br>&nbsp; &nbsp; 3/13/25', '4pm-6pm']
    ],
    "Morris Library": ["Honestly Abe", "Transcendent Resilience"],
    "Old College": [["Colors of Old College", '<br>&nbsp; &nbsp; 3/2/25', '']],
    "Penny Hall": ["Minerals from China and India", "Sculptural Copper Saved from the Smelter"],
    "Perkins": [
        ["Open Arcade", "<br>&nbsp; &nbsp;  3/3/25 - 3/4/25 ", "12-11pm"],
        ["Geek Week", "<br>&nbsp; &nbsp;3/4/25", "7pm"],
        ["Movie: Star Trek", "<br>&nbsp; &nbsp;3/5/25", "8:30-10:30pm"]
    ],
    "Recitation Hall": [["Colors, Land, and Building", "<br>&nbsp; &nbsp;3/2/25", ""]],
    "Sharp Lab": [
        ["CIS Seminar: Wenjing Lou, Ph.D.", "<br>&nbsp; &nbsp; 3/14/25", "11:30am"],
        ["CIS Seminar: Adam Perer, Ph.D.", "<br>&nbsp; &nbsp; 3/21/25", "11:30am"]
    ],
    "Trabant": [
        ["An Evening with John Cho", "<br>&nbsp; &nbsp; 3/3/25", "5pm"],
        ["Lego Fest", "<br>&nbsp; &nbsp; 3/4/25", "11am-2pm"],
        ["Battle of the Bands", "<br>&nbsp; &nbsp; 3/8/25", "10:00pm-1:00am"]
    ],
};

// === FUNCTION: DISPLAY BUILDING EVENTS ===
function buildingEvent(currentBuilding) {
    let eventList = buildingEvents[currentBuilding] || [];
    Events = `Events in: ${currentBuilding}`;

    let eventDetails = eventList.length === 0
        ? '<li>No events available</li>'
        : eventList.map(event => Array.isArray(event) 
            ? `<li>${event[0]} - ${event[1]} (${event[2]})</li>` 
            : `<li>${event}</li>`).join('');

    const eventsTab = document.getElementById("events-tab");
    if (eventsTab) {
        eventsTab.innerHTML = `<h2>${Events}</h2><ul>${eventDetails}</ul>`;
    } else {
        console.error("events-tab element not found!");
    }
}

// === FUNCTION: INITIALIZE GOOGLE MAP ===
function initMap() {
    const udBounds = {
        north: 39.6915,
        south: 39.6600,
        east: -75.7410,
        west: -75.7700
    };
    const udCenter = { lat: 39.6766, lng: -75.7500 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: udCenter,
        zoom: 15,
        restriction: { latLngBounds: udBounds, strictBounds: true },
        mapTypeId: "roadmap"
    });

    new google.maps.Marker({ position: udCenter, map, title: "University of Delaware" });

    google.maps.event.addListener(map, 'dragend', checkBounds);
}

// === FUNCTION: KEEP MAP WITHIN UD BOUNDARIES ===
function checkBounds() {
    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(39.6600, -75.7700),
        new google.maps.LatLng(39.6915, -75.7410)
    );
    if (!bounds.contains(map.getCenter())) {
        map.setCenter({ lat: 39.6766, lng: -75.7500 });
    }
}

// === FUNCTION: VISIT A BUILDING (SET MARKER & DISPLAY EVENTS) ===
function visitBuilding(buildingName, location) {
    if (currentBuildingMarker) currentBuildingMarker.setMap(null);

    currentBuildingMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: buildingName
    });

    map.setCenter(location);
    map.setZoom(18);
    buildingEvent(buildingName);
}

// === BUILDINGS DATA ===
const buildings = {
    "Alison Hall": { lat: 39.678738, lng: -75.750628 },
    "Brown Lab": { lat: 39.679701, lng: -75.751330 },
    "Carpenter Sports Building": { lat: 39.684290, lng: -75.751821 },
    "Drake Hall": { lat: 39.679754, lng: -75.750729 },
    "Gore Hall": { lat: 39.680602, lng: -75.753058 },
    "Memorial Hall": { lat: 39.679186, lng: -75.752148 },
    "Morris Library": { lat: 39.678038, lng: -75.753104 },
    "Old College": { lat: 39.683975, lng: -75.753687 },
    "Perkins": { lat: 39.676941, lng: -75.749533 },
    "Sharp Lab": { lat: 39.681137, lng: -75.752886 },
    "Trabant": { lat: 39.682381, lng: -75.754211 },
    "Wolf Hall": { lat: 39.681224, lng: -75.751725 }
};

// === FUNCTION: POPULATE BUILDING DROPDOWN ===
function addDropdownOptions() {
    const dropdown = document.getElementById("dropdown-content");
    dropdown.innerHTML = "";

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

// === FUNCTION: CENTER MAP TO UD CAMPUS ===
function centerMap() {
    const udLocation = { lat: 39.678, lng: -75.7526 };
    map.setCenter(udLocation);
    map.setZoom(15);
}

// === INITIALIZE EVERYTHING ON PAGE LOAD ===
document.addEventListener("DOMContentLoaded", () => {
    addDropdownOptions();
    initMap();
});

// Coordinates for UD Health Services
const udHealthServices = { lat: 39.6784, lng: -75.7502 };

document.getElementById("student-health").addEventListener("click", function(event) {
    event.preventDefault();  // Prevent default behavior of the link

    // Center the map on UD Health Services location
    map.setCenter(udHealthServices);
    map.setZoom(18);  // Adjust zoom level if necessary

    // Optionally, add a marker at the UD Health Services location
    new google.maps.Marker({
        position: udHealthServices,
        map: map,
        title: "UD Health Services"
    });
});
