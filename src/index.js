const express = require('express');
const socketio = require('socket.io');
const mongoose = require('mongoose');

const http = require('http');
const path = require('path');

// initializing server and sockets
const app = express();
const server= http.createServer(app);
const io = socketio.listen(server);

// connection to the server
mongoose.connect('mongodb://Pruebas:pruebas@computercloud-shard-00-00-r4yag.mongodb.net:27017,computercloud-shard-00-01-r4yag.mongodb.net:27017,computercloud-shard-00-02-r4yag.mongodb.net:27017/test?ssl=true&replicaSet=computercloud-shard-0&authSource=admin&retryWrites=true')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// settings 
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// sockets
require('./sockets')(io);

// starting the server
server.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});


