const translate = require('./TextTranslateApi.js').translateMessage;

module.exports = function(io){
  var clients = {};

  io.sockets.on('connection', (socket) => {
    socket.language = 'en';
    clients[socket.id] = socket;

    socket.on('message', (message) => {
      clients[socket.id].username = message.username;
      translate(message, (translatedMessages) => {
        for (var socketId in clients) {
          var translatedMessage = {
            username: message.username,
            text: translatedMessages[clients[socketId].language + 'Message']
          };
          clients[socketId].emit('message', translatedMessage)
          // io.sockets.in(message.room).emit('message', translatedMessage);
        }
      });
    }); 

    socket.on('subscribe', function(room) {
      socket.join(room);
    });

    socket.on('unsubscribe', function(room) {
      socket.leave(room);
    });

    socket.on('changeLanguage', (code) => {
      clients[socket.id].language = code;
    });

    socket.on('disconnect', (socket) => {
      delete clients[socket.id];
      console.log('disconnected in sockets.js');
    });
  });
}