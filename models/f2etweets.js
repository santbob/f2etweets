(function () {
	"use strict";
	var twitter = require('twitter'), qs = require('querystring'), twithelper = require('twitter-text'), events = require('events'), twit;
    twit = new twitter({
        consumer_key: 'iv9erP65Rf0yDpIYI9ZMg',
        consumer_secret: '2ygQaFHRIQVdPE4qdfxowuWm8S8y2yEDgVBAzdsmLp0',
        access_token_key: '66309838-Yt2U301fkIAz3yKjIaIu4p9rz3Z0zukxwrOhByKG6',
        access_token_secret: '1f7iQqPazcArsfZdTUpouEeLa7IySyZlE6JNw8N8'
    });

    function F2etweets(lastuptime) {
        this._constructor.apply(this, arguments);
        this.lastuptime = lastuptime;
    }

    F2etweets.HTML = 'html OR html5 from:slicknet OR from:thierrykoblentz';
    F2etweets.JS = 'js OR javascript OR ecmascript from:addy_osmani OR from:badass_js OR from:smashingmag OR from:jsprf OR from:__DavidFlanagan OR from:slicknet OR from:jeresig';
    F2etweets.CSS = 'css OR css3 from:slicknet OR from:thierrykoblentz';
    F2etweets.prototype = new events.EventEmitter();
    F2etweets.prototype._constructor = function (lastuptime) {
        this.lastuptime = lastuptime || 0;
    };
	F2etweets.prototype.search = function (query, key, fn) {
		var self = this, datakey = key, data = {};
		twit.search(query, function (res) {
			if (res.results) {
				var results = [], i, j = res.results.length, isnewtweet, date, tweettimems, result, tweet;
				for (i = 0; i < j; i += 1) {
					tweet = res.results[i];
					date = new Date(Date.parse(tweet.created_at));
					tweettimems = date.getTime();
					isnewtweet = Number(tweettimems) > Number(self.lastuptime);
					if (isnewtweet) {
						result = {
							id: tweet.id,
							text: twithelper.autoLink(tweet.text),
							geo: tweet.geo
						};
						results.push(result);
					}
				}
				data[datakey] = results;
				fn(data);
			}
        });
    };
	F2etweets.prototype.query = function (callback) {
		this.search(F2etweets.HTML, 'html', callback);
		this.search(F2etweets.JS, 'js', callback);
		this.search(F2etweets.CSS, 'css', callback);
	};

	if (typeof exports !== 'undefined') {
		exports.F2etweets = F2etweets;
	}
})();
