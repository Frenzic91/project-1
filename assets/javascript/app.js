var config = {
    apiKey: "AIzaSyB48Vx0hCvWOPeNMXwLM4Ci0n_Ho6_lYf8",
    authDomain: "testproject-b18c8.firebaseapp.com",
    databaseURL: "https://testproject-b18c8.firebaseio.com",
    projectId: "testproject-b18c8",
    storageBucket: "testproject-b18c8.appspot.com",
    messagingSenderId: "343903222902"
};
firebase.initializeApp(config);

window.fbAsyncInit = function () {
    FB.init({
        appId: '219425355349457',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
    });


    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        $('#fbli').hide();
        $('#content').append('<button id="em" type="button" class="btn btn-danger">CALL 911</button><button id="im" type="button" class="btn btn-warning">IMMEDIATE</button><button id="ni" type="button" class="btn btn-secondary">NON-IMMEDIATE</button>');
        FB.api('/me/', 'GET', function (response) {

            if (response && !response.error) {
                console.log(response);
            } else {

            }

        });
    }
    else {
        console.log('b');
    }

}

function postFB(body) {
    FB.api('/me/feed', 'post', { message: body }, function (response) {
        if (!response || response.error) {
            alert(response.error.message);
        } else {
            alert('Post ID: ' + response.id);
        }
    });
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

$(document).ready(function () {
    $('#content').append('<fb:login-button id="fbli" scope="public_profile,email,user_posts" onlogin="checkLoginState();"></fb:login-button>');

    $('body').on('click', '#ni', function () {
        $('#content').empty();
        $('#content').append('<br>');
        $('#content').append('<button type="button" class="btn btn-secondary">NON-IMMEDIATE</button>');
        $('#content').append('<button type="button" class="btn btn-warning">IMMEDIATE</button>');
        $('#content').append('<button type="button" class="btn btn-danger">CALL 911</button>');
        $('#content').append(' <div id="map"></div><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ&callback=initMap"></script>');
    });

    $('body').on('click', '#im', function () {
        $('#content').empty();
        $('#content').append('<br>');
        $('#content').append('<button type="button" class="btn btn-secondary">NON-IMMEDIATE</button>');
        $('#content').append('<button type="button" class="btn btn-warning">IMMEDIATE</button>');
        $('#content').append('<button type="button" class="btn btn-danger">CALL 911</button>');
        $('#content').append(' <div id="map"></div><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ&callback=initMap"></script>');

    });

    $('body').on('click', '#em', function () {
        $('#content').empty();
        $('#content').append('<br>');
        $('#content').append('<button id="pol" type="button" class="btn btn-warning">POLICE</button>');
        $('#content').append('<button id="amb" type="button" class="btn btn-success">AMBULANCE</button>');
        $('#content').append('<button id="fir" type="button" class="btn btn-danger">FIRE</button>');


        firebase.database().ref("/").set({

            incident: {
                type: 'Emergeny',
                service: '',
                distance: 0
            }

        });
    });

    $('body').on('click', '#pol', function () {

        firebase.database().ref("/incident").update({
            "service": 'Police'
        });
        $('#pol').remove();
        $('#amb').remove();
        $('#fir').remove();
        $('#content').append(' <div id="map"></div><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ&callback=initMap"></script>');

        var d;

        firebase.database().ref().on("value", function (snapshot) {
            var temp = snapshot.val();
            d = temp.incident.distance;
            if (d > 0) {

                $('#content').prepend('<button id="tre" type="button" class="btn btn-warning">Tresspasser</button>');
                $('#content').prepend('<button type="button" class="btn btn-secondary">Domestic Violence</button>');
                $('#content').prepend('<button type="button" class="btn btn-danger">Burgurly</button>');
                $('#content').prepend('<button type="button" class="btn btn-danger">Stolen Vechile</button>');

            }
            else if (d > 1000) {

            }
            else if (d > 2000) {

            }
            else if (d > 5000) {

            }
            else if (d > 10000) {

            }
            else if (d > 25000) {

            }
            else if (d > 50000) {

            }
            else if (d > 100000) {

            }
            else {

            }
        }, function (error) {
            console.log("Error: " + error.code);
        });
    });


    $('body').on('click', '#amb', function () {

        firebase.database().ref("/incident").update({
            "service": 'Ambulance'
        });
        $('#pol').remove();
        $('#amb').remove();
        $('#fir').remove();
        $('#content').append(' <div id="map"></div><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ&callback=initMap"></script>');
    });


    $('body').on('click', '#fir', function () {
        firebase.database().ref("/incident").update({
            "service": 'Fire'
        });
        $('#pol').remove();
        $('#amb').remove();
        $('#fir').remove();
        $('#content').append(' <div id="map"></div><script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCx7yMbCH5ACvx_95q_Rqr_nkx9hbSVppQ&callback=initMap"></script>');

    });

    $('body').on('click', '#tre', function () {
        firebase.database().ref().on("value", function (snapshot) {
            var temp = snapshot.val();
            d = temp.incident.distance;

            var body = 'WARNING THIS IS A TEST BY E-SAVE. I am this ' + d + 'm away from my house and there is a trepasser please call 911. WARNING THIS IS A TEST BY E-SAVE. Post By FB API';
            postFB(body);
        });
    });

});

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
            hadd = $('input[name=ha]').val();
            getLL(hadd);
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
    var marker = new google.maps.Marker({
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