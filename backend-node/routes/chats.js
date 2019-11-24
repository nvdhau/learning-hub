var express = require('express');
var router = express.Router();

var counter = 0;
var users = [];

module.exports = (io) => {
  //Whenever someone connects this gets executed
  const nsp = io.of('/api/chats');

  nsp.on('connection', function(socket){
    console.log('A user connected');

    // ----------------------
    socket.on('init', function (name) {
      //user.socket = socket.id;
      console.log(name + ", " + socket.id);
      users[name] = socket.id;
    });
    // ----------------------

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
      console.log('A user disconnected');
      clearInterval(myInterval);

      for (var key in users)
        delete users[key];
    });

    //Send a message after a timeout of 2 seconds
    setTimeout(function () {
      counter++;
      //console.log("sending count : " + counter);
      socket.send('Sending a notice - 2 seconds after connection! counter = ' + counter);

      //Sending an object when emmiting an event
      socket.emit('e1', {description1: 'A custom event named e1! counter = ' + counter});

      socket.emit('e2', {description2: 'A custom event named e2! counter = ' + counter});
    }, 2000);

    var myInterval = setInterval(function () {
      var d = new Date();
      let t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      //console.log(t);
      socket.emit('e3', {mytime: 'A custom event named e3! time = ' + t});
    }, 1000);

    // waiting for the client browser to send something
    socket.on('rmsg', function (arg1, arg2, to) {
      console.log('message Tag ', arg1, ' saying ', arg2);
      socket.broadcast.emit('rmsg', {m: 'message (Tag: ' + arg1 + ', saying: ' + arg2 + ')'});
      socket.to(users[to]).emit('rmsg', {m: ' just for you - message (Tag: ' + arg1 + ', saying: ' + arg2 + ')'});
      console.log(to + ", " + users[to]);
    });
  });
  return router;
};
