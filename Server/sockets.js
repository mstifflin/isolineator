const translate = require('./TextTranslateApi.js').translateMessage;

module.exports = function(io){
  var clients = {};

  io.sockets.on('connection', (socket) => {
    clients[socket.id] = {};

    socket.on('message', (message) => {
      clients[socket.id].username = message.username;
      translate(message, (translatedText) => {
        var translatedMessage = {
          username: message.username,
          message: translatedText
        };


        io.emit('message', translatedMessage);
      });
    });

    socket.on('changeLanguage', (code) => {
      clients[socket.id].language = code;
    });

    socket.on('disconnect', (socket) => {
      console.log('disconnected in sockets.js');
    });
  });


}