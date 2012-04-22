
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'), twitter = require('twitter'), qs = require('querystring');

var server = module.exports = express.createServer();
var io = require('socket.io').listen(server);
var twit = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
});
 

// Configuration

server.configure(function(){
  server.set('views', __dirname + '/views');
  server.set('view engine', 'jade');
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(server.router);
  server.use(express.static(__dirname + '/public'));
});

server.configure('development', function(){
  server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function(){
  server.use(express.errorHandler());
});
var jsQuery, cssQuery, htmlQuery, search, data = {};
search = function (query,key){
        twit.search(query,function(res){
           var datakey = key;
           if(res.results){
                data[datakey] = res.results;
           }
        });
};

jsQuery = function (){
        var query = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
        return search(query,'js');
};

htmlQuery = function (){
        var query = 'html OR html5 from:slicknet OR from:thierrykoblentz';
        return search(query,'html');
};

cssQuery = function (){
        var query = 'css OR css3 from:slicknet OR from:thierrykoblentz';
        return search(query,'css');
};

jsQuery();
htmlQuery();
cssQuery();
// Routes
server.get('/', routes.index);
server.get('/home', function(req, res){
        res.render('home', {
        title: 'Home',
        data: data
    });
});
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});

