var request = require('request');

function requestJson (url, cb) {
    request(url, function(err, result) {
        if (err) {
            cb(err);
        }
        else {
            try {
                cb(null, JSON.parse(result.body));
            }
            catch(err) {
                cb(err);
            }
        }
    });
}

