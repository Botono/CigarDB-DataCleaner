/*
 * Serve JSON to our AngularJS client
 */
var
    api_key = '2483f102-e4ae-4b41-b56f-e9e344ef9083',
    http = require('http');


function makeAPICall (path) {

}


exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};


exports.getABrand = function(req, res) {
    var options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: 'GET',
            //path: '/cleanup/getBrandToClean?api_key='+api_key
            path: '/brands/516e15e158577fdc2100000b?api_key='+api_key
        },
        return_obj = '';
    console.log('GETTING A BRAND');
    var api_req = http.request(options_obj, function(api_res) {
        var output = '';
        if (api_res.statusCode == 200) {
            api_res.setEncoding('utf8');

            api_res.on('data', function(chunk) {
                output += chunk;
            });

            api_res.on('end', function() {
                return_obj = output;
                res.send(200, return_obj);
            })
        }
    });

    api_req.on('error', function(err) {
        res.send(err);
    });
    api_req.end();
};

exports.getCigarsByBrand = function(req, res) {
    var options_obj = {
            hostname: 'localhost',
            port: 8080,
            method: 'GET',
            path: '/cigars?brand='+encodeURIComponent(req.query.brand_name)+'&api_key='+api_key
        },

        return_obj = '';
    console.log('GETTING CIGARS BY BRAND: '+req.query.brand_name);
    var api_req = http.request(options_obj, function(api_res) {
        var output = '';
        if (api_res.statusCode == 200) {
            api_res.setEncoding('utf8');

            api_res.on('data', function(chunk) {
                output += chunk;
            });

            api_res.on('end', function() {
                return_obj = output;
                res.send(200, return_obj);
            })
        }
    });

    api_req.on('error', function(err) {
        res.send(err);
    });
    api_req.end();
}

exports.getBrands = function(req, res) {
    var options_obj = {
        hostname: 'localhost',
        port: 8080,
        method: 'GET',
        path: '/brands?api_key='+api_key
        },
        return_obj = '';
    var api_req = http.request(options_obj, function(api_res) {
        var output = '';
        if (api_res.statusCode == 200) {
            api_res.setEncoding('utf8');

            api_res.on('data', function(chunk) {
                output += chunk;
            });

            api_res.on('end', function() {
                return_obj = output;;
                res.send(200, return_obj);
            })
        }
    });

    api_req.on('error', function(err) {
        res.send(err);
    });
    api_req.end();
};