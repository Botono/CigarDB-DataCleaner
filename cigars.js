var
    cigars = { },
    api_key = '2483f102-e4ae-4b41-b56f-e9e344ef9083',
    http = require('http');

cigars.get = function (req, res) {
    res.json({});
};

cigars.save = function (req, res) {
    req.body.api_key = api_key;

    var
        bodyString = JSON.stringify(req.body),
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        },
        pathString = (req.body.id) ? '/cigars/' + encodeURIComponent(req.body.id) : '/cigars',
        methodString = (req.body.id) ? 'PUT' : 'POST',
        options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: methodString,
            path: pathString,
            headers: headers
        },
        return_obj = '';

    if (req.body.id) {
        console.log('UPDATE CIGAR DATA: ' + JSON.stringify(req.body));
    } else {
        console.log('CREATE CIGAR DATA: ' + JSON.stringify(req.body));
    }


    var api_req = http.request(options_obj, function (api_res) {
        var output = '';
        if (api_res.statusCode == 202) {
            api_res.setEncoding('utf8');

            api_res.on('data', function (chunk) {
                output += chunk;
            });

            api_res.on('end', function () {
                return_obj = JSON.parse(output);
                res.send(202, return_obj.data);
            })
        }
    });
    api_req.write(bodyString);
    api_req.on('error', function (err) {
        res.send(err);
    });
    api_req.end();
};

cigars.query = function (req, res) {
    var options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: 'GET',
            path: '/cigars?brand=' + encodeURIComponent(req.query.brand) + '&api_key=' + api_key
        },

        return_obj = '';
    console.log('GETTING CIGARS BY BRAND: ' + req.query.brand);
    var api_req = http.request(options_obj, function (api_res) {
        var output = '';
        if (api_res.statusCode == 200) {
            api_res.setEncoding('utf8');

            api_res.on('data', function (chunk) {
                output += chunk;
            });

            api_res.on('end', function () {
                return_obj = JSON.parse(output);
                res.send(200, return_obj.data);
            })
        }
    });

    api_req.on('error', function (err) {
        res.send(err);
    });
    api_req.end();
};

cigars.remove = function (req, res) {
    req.body.api_key = api_key;
    req.body.reason = req.query.reason;

    var
        bodyString = JSON.stringify(req.body),
        headers = {
            'Content-Type': 'application/json',
            'Content-Length': bodyString.length
        },
        pathString = '/cigars/' + encodeURIComponent(req.params.id),
        options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: 'DELETE',
            path: pathString,
            headers: headers
        },
        return_obj = '';


    console.log('DELETE CIGAR DATA: ' + pathString);

    var api_req = http.request(options_obj, function (api_res) {
        var output = '';

        if (api_res.statusCode == 200 || api_res.statusCode == 202) {
            api_res.setEncoding('utf8');
            api_res.on('data', function (chunk) {
                output += chunk;
            });

            api_res.on('end', function () {
                return_obj = JSON.parse(output);
                res.send(200, return_obj.data);
            })
        }
    });
    api_req.write(bodyString);
    api_req.on('error', function (err) {
        res.send(err);
    });
    api_req.end();
};

module.exports = cigars;