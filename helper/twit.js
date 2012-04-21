var twitter = require('ntwitter');
var twit = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
});
console.log("checking twit object " + twit);
/*twit.jsQuery = function (){
        var query = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
        return this.search(query);
};

twit.htmlQuery = function (){
        var query = 'html OR html5 from:slicknet OR from:thierrykoblentz';
        return this.search(query);
};

twit.cssQuery = function (){
        var query = 'css OR css3 from:slicknet OR from:thierrykoblentz';
        return this.search(query);
};

var search = function (query){
        twit.search(query, function(err, data) {
              if(err){
                console.log("Some error - "+err);
                return false;
              }
              if(data){
                return data.results;
              }
        });
}*/
exports.twit = twit;
