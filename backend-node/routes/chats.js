var express = require('express');
var router = express.Router();

var users = [];

module.exports = (io) => {
  //Whenever someone connects this gets executed
  // const nsp = io.of('/api/chats');

  // nsp.on('connection', function(socket){
  io.on('connection', function (socket) {
    console.log('A user connected');

    var newUid;
    // ----------------------
    // type messages
    // MESSAGE = 0;
    // LOG = 1;
    // ACTION = 2;
    socket.on('init', function (uid, ack) {
      console.log({uid});
      users[uid] = socket.id;
      console.log("connected users", users);
      newUid = uid; //save uid for delete when disconnect

      let emitted = {
        content: 'You are online',
        type: 1,
        userUid: uid
      };
      ack(emitted);
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

      socket.to(users[to]).emit('receiveMsg', {
        m: ' just for you - message (From: ' + from + ', saying: ' + message + ')',
        type: 0,
        userUid: from,
        content: message,
      });
      console.log(from + ", " + to);
    });

  });
  return router;
};
