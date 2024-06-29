let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });

    // Example of adding a marker
    const marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map,
        title: "Hello World!",
    });

    markers.push(marker);

    // Load initial data
    loadCrimeReports();
}

function loadCrimeReports() {
    // Fetch crime reports from your backend and add markers
    // Example:
    fetch('/api/reports')
        .then(response => response.json())
        .then(data => {
            data.forEach(report => {
                const marker = new google.maps.Marker({
                    position: { lat: report.latitude, lng: report.longitude },
                    map: map,
                    title: report.type,
                });

                markers.push(marker);
            });
        });
}

document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Apply filters and update map markers
});

document.getElementById('report-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Submit the crime report
});