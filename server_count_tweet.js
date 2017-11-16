var express = require("express"),
http = require("http"),
tweetCounts = require("./tweet_counter_redis.js"),
app = express();

app.use(express.static(__dirname + "/client_tweet"));
http.createServer(app).listen(3000);
app.get("/counts.json", function(req, res){
	res.json(tweetCounts)
});