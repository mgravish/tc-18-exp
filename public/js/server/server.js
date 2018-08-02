var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

// Set root directory and serve Client.html on connect
app.use(express.static(__dirname + '../../../..' + '/public'));
app.get('/', function(req, res) {
  var options = {
    root: __dirname + '../../..',
  };
  res.sendFile('client.html', options);
});

// Assigning Unique Usernames
var users = {};
var getDefaultName = function(){
    var cnt = 0;
    for (user in users) {
        cnt+=1;
    }
    return String(cnt);
};

// Assigning a random color to each user from a palette
var getRandomColor = function(){
    var palette = ['#ffc35e', '#24c7f6', '#ff5a5a', '#6441a4'];
    var col = palette[Math.floor(Math.random() * palette.length)];
    return col;
};

// Connection Code
io.on('connection', function(socket) {

  var name = getDefaultName();
  var user = {'name': getDefaultName(), 'col': getRandomColor()};
  users[socket.id] = user;
  data = {name: name};
  socket.emit('initName', data);

  //Don't emit 'User Joined' event if the game joins
  if(!socket.handshake.query['game']) { 
    console.log('User ' + users[socket.id].name + ' has joined!');
    io.emit('user joined', data);
  }

  socket.on('disconnect', function(){
    var nameToDelete = users[socket.id].name;
    io.emit('user left', nameToDelete);
    
    delete users[socket.id];
    console.log('User ' + nameToDelete + ' has disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg, users[socket.id]);
    console.log(users[socket.id].name+" "+msg)
  });
  
  socket.on('user drawing', function(msg){
    io.emit('draw', msg);
    console.log(users[socket.id].name+" "+msg)
  });
});

// Begin listening for connections
var server_port = process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

http.listen(server_port, server_host, function(){
  console.log('listening on host: '+server_host+', port: '+server_port);
});

