const translate = require('./TextTranslateApi.js').translateMessage;
const {getMessages} = require('../mongo-db/messages.js');

module.exports = function(io){
  var clients = {};

  io.sockets.on('connection', (socket) => {
    // socket.language = 'en';
    clients[socket.id] = socket;

    socket.on('message', (message) => {
      var room = message.room;
      clients[socket.id].username = message.username;
      translate(message, (translatedMessages) => {
        for (var socketId in clients) {
          if (clients[socketId].room === room) {
            var translatedMessage = {
              username: message.username,
              message: translatedMessages[clients[socketId].language + 'Message']
            };
            clients[socketId].emit('message', translatedMessage)
          }
        }
      });
    }); 

    socket.on('subscribe', function(room) {
      clients[socket.id].room = room;
      var code = clients[socket.id].language;
      getMessages(room, code)
      .then((results) => {
        results.forEach(function(result) {
          var message = {
            username: result.username,
            message: result[code + 'Message']
          }
          socket.emit('message', message);
        });
      });
      socket.join(room);
    });

    socket.on('unsubscribe', function(room) {
      socket.leave(room);
    });

    socket.on('changeLanguage', (code) => {
      clients[socket.id].language = code;
      getMessages(clients[socket.id].room, code)
      .then((results) => {
        results.forEach(function(result) {
          var message = {
            username: result.username,
            message: result[code + 'Message']
          }
          socket.emit('message', message);
        });
      });
    });

    socket.on('disconnect', (socket) => {
      delete clients[socket.id];
      console.log('disconnected in sockets.js');
    });
  });
}