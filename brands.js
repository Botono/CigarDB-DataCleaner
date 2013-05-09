var
    brands = { },
    api_key = '2483f102-e4ae-4b41-b56f-e9e344ef9083',
    http = require('http');


brands.save = function (req, res) {
    res.send(500);
};

brands.query = function (req, res) {
    var options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: 'GET',
            //path: '/cleanup/getBrandToClean?api_key='+api_key
            path: '/brands/516e15e158577fdc2100000b?api_key=' + api_key
        },
        return_obj = '';
    console.log('GETTING A BRAND');
    var api_req = http.request(options_obj, function (api_res) {
        var output = '';
        if (api_res.statusCode == 200) {
            api_res.setEncoding('utf8');

            api_res.on('data', function (chunk) {
                output += chunk;
            });

            api_res.on('end', function () {
                return_obj = JSON.parse(output);
                if (return_obj.data.established == 0) {
                    return_obj.data.established = '';
                }
                res.send(200, return_obj.data);
            })
        }
    });

    api_req.on('error', function (err) {
        res.send(err);
    });
    api_req.end();
};

brands.remove = function (req, res) {
    res.send(502);
};

module.exports = brands;