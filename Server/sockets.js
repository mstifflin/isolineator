const translate = require('./TextTranslateApi.js').translateMessage;
const {getMessages} = require('../mongo-db/messages.js');

module.exports = function(io){
  var clientLanguages = {};


  io.sockets.on('connection', (socket) => {
    clientLanguages[socket.id] = 'en';

    socket.on('message', (message) => {
      var connectedClients = Object.keys(io.sockets.adapter.rooms[message.room].sockets);
      translate(message, (translatedMessages) => {
        connectedClients.forEach(socketId => {
          io.to(socketId).emit('message', {
            username: message.username,
            message: translatedMessages[clientLanguages[socketId] + 'Message'],
            room: message.room
          });
        });
      });
    }); 

    socket.on('isTyping', (userInfo) => {
      socket.to(userInfo.room).emit('isTyping', userInfo);    
    })

    socket.on('subscribe', function(room) {
      var code = clientLanguages[socket.id];
      getMessages(room, code)
      .then((results) => {
        results.forEach(function(result) {
          var message = {
            username: result.username,
            message: result[code + 'Message'],
            room: room
          }
          socket.emit('message', message);
        });
      });
      socket.join(room);
    });

    socket.on('unsubscribe', function(room) {
      socket.leave(room);
    });

    socket.on('changeLanguage', (params) => {
      clientLanguages[socket.id] = params.code;
      getMessages(params.room, params.code)
      .then((results) => {
        results.forEach(function(result) {
          var message = {
            username: result.username,
            message: result[params.code + 'Message'],
            room: params.room
          }
          socket.emit('message', message);
        });
      });
    });

    socket.on('disconnect', (socket) => {
      delete clientLanguages[socket.id];
    });
  });
}