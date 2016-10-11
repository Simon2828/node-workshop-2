var request = require('request');
var prompt = require('prompt');
var requestJson = require('./library/request-json.js');
var colors = require('colors');

// checking import of requestJson works
// console.log(requestJson);

// function myFunction(err,val) {
//     if(err) {
//         console.log('there was an error');
//     }
//     else {
//         console.log('this is the value: ', val)
//     }
// }

// requestJson.requestJson('http://api.open-notify.org/iss-now.json', myFunction);

function getLocation(cb) {
    prompt.get("location", function(err, userInput) {
        if (err) {
            console.log('there was an error');
        }
        else {
            var userLocation = userInput.location;
            requestJson.requestJson('https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation, function(err, result) {

                if (err) {
                    console.log('there is an error');
                }
                else {
                    var long = result.results[0].geometry.location.lng;
                    var lat = result.results[0].geometry.location.lat;
                    //cb(long);
                    //cb(lat);
                    requestJson.requestJson('https://api.darksky.net/forecast/789dfe073750fc3362fd4b0c62db502a/' + lat + ',' + long,
                        function(err, result) {
                            if (err) {
                                console.log('there\'s an error');
                            }
                            else {
                                var currentWeather = result.currently.summary;
                                cb(currentWeather);


                                requestJson.requestJson('https://api.darksky.net/forecast/789dfe073750fc3362fd4b0c62db502a/' + lat + ',' + long,
                                    function(err, result) {
                                        if (err) {
                                            console.log('this is an error');
                                        }
                                        else {
                                            var next5Days = result.daily.data.splice(3, result.daily.data.length - 3).
                                            map(function(day) {
                                                return {
                                                    date: new Date(day.time * 1000).toDateString(),
                                                    weather: day.summary
                                                }; 
                                            });
                                            next5Days.forEach(function(el){
                                                console.log(el.date.green," "+el.weather.blue);
                                                
                                            })
                                            

                                        }
                                    });
                            }
                        });
                }


            });

        }
    })
}

getLocation(function(data) {
    console.log(data);
});
