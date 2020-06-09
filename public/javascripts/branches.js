const loadPlaces = function (coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    const method = 'api';

    const PLACES = [
        {
            name: "Your place name",
            location: {
                lat: 19, // add here latitude if using static data
                lng: 72, // add here longitude if using static data
            }
        },
    ];

    if (method === 'api') {
        return loadPlaceFromAPIs(coords);
    }

    return Promise.resolve(PLACES);
};

// getting places from REST APIs
function loadPlaceFromAPIs(position) {
    const params = {
        query: 'Bank',    // search places not farther than this value (in meters)
        clientId: 'QCNCYBPDW0R2ZUDNBS2GIXK4GGI201GZ50EASXOER4JJBA1I',
        clientSecret: 'W2BHPK1JRPPY0NDQFKS4LF2OKDFLEVUHUPAW2WOVIBKUWIJZ',
        version: '20300101',    // foursquare versioning, required but unuseful for this demo
        isFuzzed: false,
    };

    // Foursquare API
    const endpoint = `https://api.foursquare.com/v2/venues/search?
        &ll=${position.latitude},${position.longitude}
        &query=${params.query}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=10
        &v=${params.version}`;
    return fetch(endpoint)
        .then((res) => {
            return res.json()
                .then((resp) => {
                    return resp.response.venues;
                })
        })
        .catch((err) => {
            console.error('Error with places API', err);
        })
};

window.onload = function() {

    navigator.geolocation.getCurrentPosition(position => {
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                        daySelect = document.getElementById('branch');
                        daySelect.options[daySelect.options.length] = new Option(`${place.name} is ${place.location.distance} meters away`, `latitude:${place.location.lat};longitude:${place.location.lng};`);
                });
            })
            return position.coords;
    });
    const scene = document.querySelector('a-scene');
    // navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        
    /* },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    ); */

$("#subloc").click(function(){
    var servertype = 'dev';
    var loc = $('#branch').val();
    var url;
    if(servertype == 'prod'){
        url='192.168.1.17:3000'
    }
    else{
        url='localhost:3000'
    }
    window.location.href = `https://${url}/singleloc?location=${loc}`;
});

$("#cardloc").click(function(){
    var url="https://lcus1storage.azureedge.net/web/v3/images/global/US_BC_Static.png?v=0x8D6E559E6A5C322";
    $.get(`https://localhost:3000/card/data?url=${url}`, function(data, status){
        $('<p>'+data.data+'</p>').appendTo('.text');
      });
});

};
