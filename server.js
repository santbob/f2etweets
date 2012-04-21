
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'), twit = require('./helper/twit');

var server = module.exports = express.createServer();
var io = require('socket.io').listen(server);
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
var jsQuery, cssQuery, htmlQuery, search;
search = function (query){
        twit.search(query, function(err, data) {
              if(err){
                console.log("Some error - "+err);
                return false;
              }
              if(data){
                return data.results;
              }
        });
};

jsQuery = function (){
        var query = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
        return search(query);
};

htmlQuery = function (){
        var query = 'html OR html5 from:slicknet OR from:thierrykoblentz';
        return search(query);
};

cssQuery = function (){
        var query = 'css OR css3 from:slicknet OR from:thierrykoblentz';
        return search(query);
};

// Routes
server.get('/', routes.index);
server.get('/home', function(req, res){
        res.render('home', {
        title: 'Home',
        data:{
            'html': htmlQuery(),
            'js': jsQuery(),
            'css': cssQuery()
        }
    });
});
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});

