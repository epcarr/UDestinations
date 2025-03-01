function initMap() {
    // University of Delaware (Newark Campus) coordinates
    const universityLocation = { lat: 39.678, lng: -75.7526 };

    // Define the campus boundary (approximate bounds)
    const campusBounds = {
        north: 39.6900,
        south: 39.6650,
        east: -75.7400,
        west: -75.7650
    };

    // Create the map centered at the university
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15, // Zoom level
        center: universityLocation,
        restriction: {
            latLngBounds: campusBounds, // Restrict to campus bounds
            strictBounds: true // Prevent users from moving outside
        }
    });

    // Add a marker at the university
    new google.maps.Marker({
        position: universityLocation,
        map: map,
        title: "University of Delaware"
    });
}
