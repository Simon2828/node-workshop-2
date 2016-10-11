var request = require('request');

function requestJson (url, cb) {
    request(url, function(err, result) {
        if (err) {
            cb(err);
        }
        else {
            try {
                //console.log(result);
                cb(null, JSON.parse(result.body));
                
            }
            catch(err) {
                cb(err);
            }
        }
    });
}

// function myFunction(err, val) {
//     if (err) {
//         console.log('error')
//     }
//     else {
//         console.log('the value is: ', val)
//     }
// }


// requestJson('http://api.open-notify.org/iss-now.json', myFunction);



exports.requestJson = requestJson;