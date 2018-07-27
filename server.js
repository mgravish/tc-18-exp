var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client.html');
});


// Assigning Unique Usernames
var userNames = {};
var getDefaultName = function(){
    var cnt = 0;
    for (user in userNames) {
        cnt+=1;
    }
    return String(cnt);
};


// Connection Code
io.on('connection', function(socket){

  name = getDefaultName();
  userNames[socket.id] = name;
  data = {name: name};
  socket.emit('initName', data);


  console.log('User ' + userNames[socket.id] + ' has joined!');
  io.emit('user joined');

  socket.on('disconnect', function(){
    var nameToDelete = userNames[socket.id];
    delete userNames[socket.id];
    console.log('User ' + nameToDelete + ' has disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg, userNames[socket.id]);
    console.log(userNames[socket.id]+" "+msg)
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

