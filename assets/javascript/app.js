var config = {
    apiKey: "AIzaSyB48Vx0hCvWOPeNMXwLM4Ci0n_Ho6_lYf8",
    authDomain: "testproject-b18c8.firebaseapp.com",
    databaseURL: "https://testproject-b18c8.firebaseio.com",
    projectId: "testproject-b18c8",
    storageBucket: "testproject-b18c8.appspot.com",
    messagingSenderId: "343903222902"
};
firebase.initializeApp(config);

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var googApiKey = "AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ";
var map;
var pos;
var hpos;
var hadd;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            addMarker(pos);
            map.setCenter(pos);

            var cb = new Codebird;
            cb.setConsumerKey("ayQmqxFELX2wk3TQroPflQk1T", "LddGI4JMJqgyAcSH5NNwrAYlmmCyW28QPGC93Bwih08ttvgDKi");

            var params = {
                geocode: " " + pos.lat + "," + pos.lng + ",1mi ",
                count: 100
            };
            cb.__call(
                "search_tweets",
                params,
                function (reply) {
                    console.log(reply.statuses);
                    console.log(reply.statuses.length);

                    for(var i = 0; i < reply.statuses.length; i++){
                        var row = $("<tr>");
                        row.append("<td>" + reply.statuses[i].user.screen_name)
                        row.append("<td>" + reply.statuses[i].user.name)
                        row.append("<td>")
                        row.append("<td>" + reply.statuses[i].text);
    
                        if(reply.statuses[i].entities.urls.length !== 0){

                            row.append("<td> <a href=" + reply.statuses[i].entities.urls[0].url + ">" + reply.statuses[i].entities.urls[0].url);
                        }
                        $("tbody").append(row);
                    }


                    reply.statuses.forEach(loc => {

                        if (!loc.coordinates) {

                        }
                        else{
                            lpos = {
                                lat:  parseFloat(loc.coordinates.coordinates[1]),
                                lng:  parseFloat(loc.coordinates.coordinates[0])
                            };
                            console.log(lpos)
                            addMarker(lpos);
                        }
                        

                    });
                }
            );


        }, function () {
            handleLocationError(true, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocationz
        handleLocationError(false, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function getLL(address) {

    var queryURL = encodeURI('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ');
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
        hpos = {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
        };
        addMarker(hpos);
        getDistance(hpos, pos);
        console.log(hpos);
    });
}

function addMarker(coords) {
    new google.maps.Marker({
        position: coords,
        map: map
    });
}

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    firebase.database().ref("/incident").update({
        "distance": d
    });
    $('#content').append('<h1 style="color:white" >' + d + '</h1>'); // returns the distance in meter
}

function rad(x) {
    return x * Math.PI / 180;
};