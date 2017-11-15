var ntwitter = require("ntwitter"),
    redis = require("redis"), // require the redis module
    credentials = require("./credentials.json"),
    redisClient,
    counts = {},
    twitter;

twitter = ntwitter(credentials);

// create a client to connect to Redis
client = redis.createClient();

// now we can interact with Redis using
// client.<radisCommand>
// client expose a function with the same name
// as the Redis command

client.get("awesome", function (err, awesomeCount) {
	// "awesome" is the key in Redis
    if (err !== null) {
		//handle error
    }

    // initialize our counter to the integer version
    // of the value stored in Redis, or 0 if it's not
    // set
    counts.awesome = parseInt(awesomeCount,10) || 0;
    // (the second argument of parseInt means base 10 number)

    twitter.stream(
	"statuses/filter",
	{ track: ["awesome", "cool", "rad", "gnarly", "groovy"] },
	function(stream) {
        stream.on("data", function(tweet) {
			if (tweet.text.indexOf("awesome") >= -1) {
		        // increment the key on the 
	            client.incr("awesome");
	            counts.awesome = counts.awesome + 1;
			}
        });
	});
});

module.exports = counts;

