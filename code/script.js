let map;
let savedMarkers = [];
let currentBuildingMarker = null;  // Variable to store the current marker for the building
let building = ''; // Variable to store the building name
let Events = ''; // Variable to store the events in the building

//EVENTS FOR BUILDINGS
const buildingEvents = {
    "Alison Hall": [],
    "Alison Hall West": [],
    "Brown Lab": [],
    "Bob Carpenter Center": [],
    "Colburn Lab": [],
    "Carpenter Sports Building": [['ELI Basketball Shootaround','3/6/25','2-3:30pm'], ['Top Hen Challenge - 500m row','3/10/25','6am-11pm']],
    "Drake Hall": [],
    "Ewing": [],
    "DuPont Hall": [],
    "Evans Hall": [["Microelectriconics Community Science Days","3/22/25","9:15am-12:30pm"]],
    "Ewing Hall": [],
    "Gore Hall": [['Heaven Can You Hear Me?','3/3/25','7pm-9pm'],["Prohibited Substances","3/6/25","12:40-1:35pm"]],
    "Harker ISE Lab": [],
    "Hullihen Hall": [],
    "Kirkbride Lecture Hall": [],
    "Lerner Hall": [],
    "McDowell Hall": [],
    "Memorial Hall": [['Gobsmacked!','3/4/25','5:30pm-6:45pm'],['Documentary Poetry','3/13/25','4pm-6pm']],
    "Mitchell Hall": [],
    "Morris Library": ["Honestly Abe","Transcendent Resilience"],
    "Old College": [["Colors of Old College",'3/2/25','']],
    "Penny Hall": ["Minerals from China and India","Scupltural Cooper Saved from the Smelter",],
    "Pearson Hall": [],
    "Purnell Hall": [],
    "Perkins": [["Open Arcade", " 3/3/25 - 3/4/25 ","12-11pm"], ["Geek Week","3/4/25","7pm"], ["Movie: Star Trek", "3/5/25", "8:30-10:30pm"]],
    "Purnell Hall": [],
    "Recitation Hall": [["Colors, Land, and Building","3/2/25",""]],
    "Robinson Hall": [],
    "Sharp Lab": [["CIS Seminar: Wenjing Lou, Ph.D.","3/14/25","11:30am"],["CIS Seminar: Adam Perer, Ph.D.","3/21/25","11:30am"]],
    "Smith Hall": [],
    "Spencer Lab": [],
    "Townsend Hall": [],
    "Trabant": [["An Evening with John Cho","3/3/25","5pm"],["Lego Fest","3/4/25", "11am to 2pm"],["Band of the Bands","3/8/25","10:00pm-1:00am"]],
    "Willard Hall": [],
    "Wolf Hall": []
};

//Building events
function buildingEvent(currentBuilding) {
    let eventList = buildingEvents[currentBuilding];

    if (!eventList || eventList.length === 0) {
        Events = `No events in: ${currentBuilding}`;
    } else {
        Events = `Events in: ${currentBuilding}`;
    }

    let eventDetails = eventList.length > 0
        ? eventList.map(event => `<li>${event[0]} - ${event[1]} (${event[2]})</li>`).join('')
        : '<li>No events available</li>';

    document.getElementById("events-tab").innerHTML = `
        <h2>${Events}</h2>
        <ul>${eventDetails}</ul>`;
}


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
    // Remove the previous marker
    if (currentBuildingMarker) {
        currentBuildingMarker.setMap(null);
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

    // Update the events list
    buildingEvent(buildingName);
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
    dropdown.innerHTML = "";  // Clear previous options

    Object.keys(buildings).forEach(building => {
        const option = document.createElement("a");
        option.href = "#";
        option.innerText = building;
        option.onclick = (event) => {
            event.preventDefault();  // Prevent page jump
            visitBuilding(building, buildings[building]);  // Call visitBuilding
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
addDropdownOptions()
document.addEventListener("DOMContentLoaded", addDropdownOptions);
