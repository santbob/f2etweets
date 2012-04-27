'use strict';
var express = require('express'), routes = require('./routes'), F2etweets = require('./models/f2etweets').F2etweets;
var server = module.exports = express.createServer();
var io = require('socket.io').listen(server);

// Configuration
server.configure(function () {
	server.set('views', __dirname + '/views');
	server.set('view engine', 'jade');
	server.use(express.bodyParser());
	server.use(express.methodOverride());
	server.use(server.router);
	server.use(express.static(__dirname + '/public'));
});

server.configure('development', function () {
	server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function () {
	server.use(express.errorHandler());
});

//Configure socket.io
io.configure(function () {
	//IIS doesn't yet support WebSockets, so using XHR-polling will improve client latency on Azure (no socket failovers)
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
	socket.on('fetchTweets', function (timerobj) {
		console.log('fetchTweets Event Recieved and time to start is ', timerobj.time);
        var f2e = new F2etweets(timerobj.time);
		f2e.query();
        socket.emit('updatetweets', f2e.data);
	});
});
// Routes
//server.get('/', routes.index);
server.get('/', function (req, res) {
	res.render('home', {
		title: 'Home',
		data: []
	});
});
server.listen(3000, function () {
	console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});

