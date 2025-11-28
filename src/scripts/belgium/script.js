var map = L.map('map', {
    crs: L.CRS.Simple, 
    minZoom: 0,
    maxZoom: 2,
    zoomControl: false 
});
var imageWidth = 900;
var imageHeight = 450;
var bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay('public/images/mapbelgium.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setView([imageHeight / 2, imageWidth / 2], 0);
map.scrollWheelZoom.enable();
map.doubleClickZoom.enable();
map.dragging.enable();
var markers = [
    { 
        coords: [218, 398], 
        img: "public/images/belgium/house1.jpeg", 
        popup: "House 1<br>2-Bedroom Cabin<br>€150/night<br><img src='public/images/belgium/house1.jpeg' alt='House 1' style='width:100px;display:block;margin:8px 0;'><button class='book-btn' data-house='House 1'>Book</button>" 
    },
    { 
        coords: [205, 630], 
        img: "public/images/belgium/house2.jpeg",
        popup: "House 2<br>3-Bedroom Cabin<br>€200/night<br><img src='public/images/belgium/house2.jpeg' alt='House 2' style='width:100px;display:block;margin:8px 0;'><button class='book-btn' data-house='House 2'>Book</button>" 
    },
    { 
        coords: [205, 650], 
        img: "public/images/belgium/house3.jpeg",
        popup: "House 3<br>1-Bedroom Cabin<br>€120/night<br><img src='public/images/belgium/house3.jpeg' alt='House 3' style='width:100px;display:block;margin:8px 0;'><button class='book-btn' data-house='House 3'>Book</button>" 
    },
    { 
        coords: [218, 365], 
        img: "public/images/belgium/house4.jpeg",
        popup: "House 4<br>2-Bedroom Cabin<br>€150/night<br><img src='public/images/belgium/house4.jpeg' alt='House 4' style='width:100px;display:block;margin:8px 0;'><button class='book-btn' data-house='House 4'>Book</button>" 
    },
    { 
        coords: [215, 336], 
        img: "public/images/belgium/house5.jpeg",
        popup: "House 5<br>1-Bedroom Cabin<br>€120/night<br><img src='public/images/belgium/house5.jpeg' alt='House 5' style='width:100px;display:block;margin:8px 0;'><button class='book-btn' data-house='House 5'>Book</button>" 
    }
];
markers.forEach(function(marker) {
    L.marker(marker.coords)
        .addTo(map)
        .bindPopup(marker.popup);
});
map.on('popupopen', function(e) {
    var button = e.popup._contentNode.querySelector('.book-btn');
    if (button) {
        button.addEventListener('click', function() {
            var house = encodeURIComponent(button.getAttribute('data-house'));
            window.location.href = '/book?house=' + house;
        });
    }
});