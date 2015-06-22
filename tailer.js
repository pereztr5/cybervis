var filename = process.argv[2];
var fs = require('fs')
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

server.listen(9000);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var tail =require('child_process').spawn("tail",["-f", filename]);
io.sockets.on('connection', function (socket) {
    tail.stdout.on('data', function(data){
        console.log('message!')
        socket.emit('news',{data: data.toString()})
    });
});
