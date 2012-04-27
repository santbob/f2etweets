var express = require('express')
  , routes = require('./routes'), twitter = require('twitter'), qs = require('querystring'), twithelper = require('twitter-text'), Timer = require('./timers').Timer;
var F2etweets = require('./models/f2etweets').F2etweets;
var server = module.exports = express.createServer();
var io = require('socket.io').listen(server);
/*var twit = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
});*/
 

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

//Configure socket.io
io.configure(function () {
  //IIS doesn't yet support WebSockets, so using XHR-polling will improve client latency on Azure (no socket failovers)
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

/*var jsQuery, cssQuery, htmlQuery, search, f2etweets, data = {}, lasttimestamp = 0;
search = function (query,key,oldtimestamp){
        twit.search(query,function(res){
           var datakey = key;
           if(res.results){
                var results = new Array();
                for(var i = 0, j = res.results.length; i < j ; i+=1){
                        var tweet = res.results[i], isnewtweet;
                        var date = new Date(Date.parse(tweet.created_at));
                        var tweettimems = date.getTime();
                        oldtimestamp = oldtimestamp || 0; 
                        isnewtweet = tweettimems > oldtimestamp;
                        console.log('is new tweet?', isnewtweet);
                        if(isnewtweet){
                            var result = {
                                id: tweet.id,
                                text: twithelper.autoLink(tweet.text),
                                geo: tweet.geo
                            }
                            results.push(result);
                        }
                }
                data[datakey] = results;
           }
        });
};

jsQuery = function (time){
        var query = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
        return search(query,'js',time);
};

htmlQuery = function (time){
        var query = 'html OR html5 from:slicknet OR from:thierrykoblentz';
        return search(query,'html',time);
};

cssQuery = function (time){
        var query = 'css OR css3 from:slicknet OR from:thierrykoblentz';
        return search(query,'css',time);
};

f2etweets = function(time){
        jsQuery(time);
        htmlQuery(time);
        cssQuery(time);
};
*/
console.log('f2etweets object',F2etweets)
io.sockets.on('connection', function (socket) {
  socket.on('fetchTweets', function (timerobj) {
        console.log('fetchTweets Event Recieved and time to start is ',timerobj.time);
        var f2e = new F2etweets(timerobj.time);        
        f2e.query();
        socket.emit('updatetweets',f2e.data);
  });
});
// Routes
//server.get('/', routes.index);
server.get('/', function(req, res){
        res.render('home', {
        title: 'Home',
        data: []
    });
});
/*var timer = new Timer(6000);
timer.addListener('timer', function (){
        //console.log('timer ', timer.currentCount, timer.repeatCount);
        var currenttime = new Date().getTime();
        f2etweets();
        lasttimestamp = currenttime;
        io.sockets.emit('updatetweets',data);
});
timer.addListener('timerComplete', function () {
  //console.log('timerComplete', timer.currentCount, timer.repeatCount);
});
timer.start();
*/
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});

