/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api');

var app = module.exports = express();

// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/name', api.name);
app.get('/api/getBrands', api.getBrands);
app.get('/api/brand', api.getABrand);
app.get('/api/getCigarsByBrand', api.getCigarsByBrand);
app.get('/api/cigars', api.getCigarsByBrand);
app.get('/api/cigarDomainValues', api.getCigarDomainvalues);
//app.get('/api/cigars', api.getCigars);
app.put('/api/cigars/:id', api.updateCigar);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
