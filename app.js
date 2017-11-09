//app.js

// Set up express server
var express  = require('express');
var app      = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);
var path     = require('path');
var port     = 3000;

server.listen(port, () => console.log(`Pesterchum listening on port ${port}!`));

// Routing
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Pesterchum', message: 'Hello there!' })
})

// Chatroom
io.on('connection', function (socket) {

    // set username
    socket.on('set username', function (username) {
      socket.username = username;
    })

    // emit new message
    socket.on('new message', function (data) {
        socket.broadcast.emit('new message', {
          username: socket.username,
          message: data
        });
    });

    // disconnect
    socket.on('disconnect', function() {
      socket.broadcast.emit('user left', {username: socket.username})
    })


});


  // Features to implement
    // emit new message
    // store username

    // add friends
    // send different messages to friends
