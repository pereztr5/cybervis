var fs = require('fs'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
var argument = process.argv.slice(2, process.argv.length);
var connected_users={};

server.listen(80);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

var argus = require('child_process').spawn("ra",["-S", "127.0.0.1", "-n", "-s", "stime" ,"saddr", "sport", "daddr", "dport", "--", "ipv4"]);
io.sockets.on('connection', function (socket) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    console.log(clientIp);
    argus.stdout.on('data', function(data){
        socket.emit('news',{data: data.toString()})
    });
});
