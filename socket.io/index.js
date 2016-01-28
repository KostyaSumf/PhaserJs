var express  = require('express');
var app      = express();  
var http 	 = require('http').Server(app);
var io 		 = require('socket.io')(http);

app.use(express.static(__dirname + '/www'));                    // set the static files location /public/img will be /img for users
app.get('*', function(req, res) {
    res.sendfile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

io.on('connection', function(socket){
	console.log('a user connected');

	/*socket.on('host', function (data, ack) {
		var room = makeGameId();
	});*/

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('ping', function (data) {
		//do something with recived data
		console.log(data.user);
		socket.emit('pong', 'hello!');
	});

	socket.on('playerPosition', function(player) {
		console.log(player);

		var otherPlayerPosition = {
			socketId: 123123,
			playerX: player.playerX - 60,
			playerY: player.playerY
		};

		io.emit("updatePlayerEnemie", otherPlayerPosition);
    });

	//sio.sockets.in(req.sessionID).send('Man, good to see you back!');
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});