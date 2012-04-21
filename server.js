
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes'), twit = require('./helper/twitter');

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

// Routes

server.get('/', routes.index);
server.get('/home', function(req, res){
        res.render('home', {
        title: 'Home',
        data:{
            'html': twit.htmlQuery(),
            'js': twit.jsQuery(),
            'css': twit.cssQuery()
        }
    });
});
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});


