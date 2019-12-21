function initMap() {
    if ($("#map").length > 0) {
        const mapElement = document.getElementById('map'),
            map1Latitude = mapElement.getAttribute('data-latitude'),
            map1Longtitude = mapElement.getAttribute('data-longitude');
        const mapOptions = {
            center: new google.maps.LatLng(map1Latitude, map1Longtitude),
            zoom: 16,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT
            },
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
            },
            scaleControl: false,
            scrollwheel: false,
            panControl: false,
            streetViewControl: false,
            draggable: true,
            overviewMapControl: false,
            fullscreenControl: false,
            overviewMapControlOptions: {
                opened: false
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const sb_map = new google.maps.Map(mapElement, mapOptions);
        const locations = [['', 'undefined', 'undefined', 'undefined', 'undefined', map1Latitude, map1Longtitude, '']];


        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(map1Latitude, map1Longtitude),
            map: sb_map,
        });
    }

};
$(document).ready(function () {
    initMap();
});