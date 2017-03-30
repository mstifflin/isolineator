angular.module('app')
.controller('ChatCtrl', function($scope, isolineatorService) {
  var socket = io();
  this.englishText = '';
  this.foreignText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = [];
  this.chatrooms = ['lobby'];
  this.chatroom = 'lobby';
  this.addRoom = false;
  this.chatting = true;


  isolineatorService.getChatLang((data) => {
    this.languages = data.data;
  });

  socket.emit('subscribe', this.chatroom);
  socket.emit('changeLanguage', this.translateTo);
  
  this.sendMessage = () => {
    if (this.foreignText) {
      var message = { 
        username: this.username,
        text: this.foreignText,
        langCode: this.translateTo,
        room: this.chatroom
      };
      socket.emit('message', message);
      this.foreignText = '';
    }
  }

  //waiting for the audio
  socket.on('transcription', (data, trans) => {
      this.foreignText = trans;
      this.englishText = data;
  });

  this.changeLanguage = () => {
    this.messages = [];
    socket.emit('changeLanguage', this.translateTo);
  }

  socket.on('message', (message) => {
    $scope.$apply(() => {
      this.messages.push(message);
    });
  });
  
  this.toggleAddRoom = () => {
    this.addRoom = !this.addRoom;
  }

  this.createNewRoom = (room) => {
    if (this.chatrooms.indexOf(room) === -1) {
      this.chatrooms.push(room); 
    }
    this.joinRoom(room, this.chatroom);
    this.chatroom = room;
    this.addRoom = false;
    this.newRoom = '';
  }

  this.joinRoom = (newRoom, oldRoom) => {
    this.messages = [];
    socket.emit('subscribe', newRoom);
    socket.emit('unsubscribe', oldRoom);
  }
})
.directive('chat', function() {
  return {
    scope: {
    },
    controller: 'ChatCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/chat.html'
  }
})


