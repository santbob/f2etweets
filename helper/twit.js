//var http = require('http'), oauth = require('oauth'), qs = require('querystring');
var twitter = require('ntwitter');
/*var twit = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
});*/

var Twit = module.exports = function Twit(){
        return this;
};

Twit.prototype.init  = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
     });

Twit.prototype.search = function (query){
        init.search(query, function(err, data) {
              console.log("gotsome response");
              if(err){
                console.log("Some error - "+err);
                return false;
              }
              if(data){
                return data.results;
              }
        });
};

Twit.prototype.jsQuery = function (){
        var query = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
        return this.search(query);
};

Twit.prototype.htmlQuery = function (){
        var query = 'html OR html5 from:slicknet OR from:thierrykoblentz';
        return this.search(query);
};

Twit.prototype.cssQuery = function (){
        var query = 'css OR css3 from:slicknet OR from:thierrykoblentz';
        return this.search(query);
};

/*exports.twitter = function (query,callback){
  var options = {
    host: "search.twitter.com",
    port: 80,
    path: '/search.json?q=',
    method: 'GET',
    access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
    access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
  };
  console.log("query string is "+query);
  options.path = options.path + "'"+query+"'";

 console.log("options.path "+ options.path);
 http.request(options, function(res) {
   console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
   res.setEncoding('utf8');
   res.on('data', function (chunk) {
        console.log("data chunk "+chunk);
        if(chunk.results){
            return chunk.results;
        }
        else{
            console.log("some kind of error");
            return false;
        }
   });
  }).end();
};*/
