var express = require('express');
var router = express.Router();

var users = [];

module.exports = (io) => {
  //Whenever someone connects this gets executed
  // const nsp = io.of('/api/chats');

  var newUid;

  // nsp.on('connection', function(socket){
  io.on('connection', function (socket) {
    console.log('A user connected');

    // ----------------------
    socket.on('init', function (uid) {

      users[uid] = socket.id;
      console.log("connected users", users);
      newUid = uid;//save uid for delete when disconnect
    });
    // ----------------------

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
      delete users[newUid];
      console.log("remained users", users);
    });

    // waiting for the client browser to send something
    socket.on('sendMsg', function (from, to, message) {

      // socket.broadcast.emit('rmsg', {
      //   m: 'message (From: ' + from + ', saying: ' + message + ')'
      // });

      socket.to(users[to]).emit('forwardMsg', {
        m: ' just for you - message (From: ' + from + ', saying: ' + message + ')'
      });
      console.log(from + ", " + to);
    });

  });
  return router;
};