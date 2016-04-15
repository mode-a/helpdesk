var
	express = require("express"),
    app = express(),
	server = require("http").Server(app),
	io = require("socket.io")(server),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	favicon = require("serve-favicon"),
	url = require("url"),
	fs = require("fs"),
	port = 3000;

server.listen(port,function() {
	console.log("Server is listening port " + port);
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(favicon(__dirname + "/public/favicon.ico"));

app.post("/user",function(req,res) {
	var ans = {
		name: req.body.username.toUpperCase(),
		lastname: req.body.userlastname.toUpperCase()
	};
	res.set("Content-Type","application/json").send(ans);
});

io.on("connection", function(socket) {
	socket.on("newMsg", function(msg){
		socket.broadcast.emit("message", msg);
	});
	//var stream = new fs.ReadStream(__dirname + "/public/media/test.jpg");
	//stream.on("readable", function(){
	//	var data = stream.read();
	//	socket.emit("img", data);
	//});
	//stream.on("end", function(){
	//	socket.emit("img", "eof");
	//	stream.destroy();
	//});
	//stream.on("error", function(){
	//	socket.emit("img", "error");
	//	stream.destroy();
	//});
	//io.on('disconnected', function() {
	//	stream.destroy();
	//});
});