var filename = process.argv[2];
var fs = require('fs')
var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
var connected_users={};

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var tail = require('child_process').spawn("ra",["-S", "127.0.0.1", "-n", "-s", "stime" ,"saddr", "sport", "daddr", "dport", "--", "ipv4"]);
io.sockets.on('connection', function (socket) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    console.log(clientIp);
    tail.stdout.on('data', function(data){
        // console.log('message!')
        socket.emit('news',{data: data.toString()})
    });
});
