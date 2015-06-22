var app = require('express')()
     , http = require('http')
     , server = http.createServer(app)
     , io = require('socket.io').listen(server);

 server.listen(80);

 app.get('/', function (req, res) {
     res.sendFile(__dirname + '/index.html');
 });

 io.sockets.on('connection', function (socket) {
     socket.emit('news', { hello: 'world' });
     socket.on('my other event', function (data) {
         console.log(data);
     });
 });
