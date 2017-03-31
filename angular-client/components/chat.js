angular.module('app')
.controller('ChatCtrl', function($scope, $timeout, isolineatorService) {
  var socket = io();
  this.messageText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = [];
  this.chatrooms = ['lobby'];
  this.chatroom = 'lobby';
  this.addRoom = false;
  this.chatting = true;

  this.otherUserIsTyping = ''
  this.stallClear = false;
  //chatting is a boolean passed to the interpreter directive & html
  //so we can hide features we don't want

  isolineatorService.getChatLang((data) => {
    this.languages = data.data;
  });

  socket.emit('subscribe', this.chatroom);
  socket.emit('changeLanguage', this.translateTo);

  socket.on('connect', () => {
    isolineatorService.setSocketId(socket.id);
  });

  this.isTyping = (stuff) => {
    socket.emit('isTyping', {
      username: this.username,
      room: this.chatroom
    })
  }

  socket.on('isTyping', (status) => {
    $scope.$apply(() => {
      if (this.otherUserIsTyping === status) {
        this.stallClear = true;
      } else {
        this.otherUserIsTyping = status;
        this.stallClear = false;
      }
    });


    setTimeout(() => {
      $scope.$apply(() => {
        if (this.stallClear === true) {
          this.stallClear = false;
        } else {
          this.otherUserIsTyping = '';
          this.stallClear = true;
        }
      });
    }, 3000)
  })


  this.sendMessage = () => {
    if (this.messageText) {
      var message = { 
        username: this.username || 'anonymous',
        text: this.messageText,
        langCode: this.translateTo,
        room: this.chatroom
      };
      socket.emit('message', message);
      this.messageText = '';
    }
  }

  //waiting for the audio
  socket.on('transcription', (data, trans) => {
      this.messageText = trans;
  });

  this.changeLanguage = () => {
    this.messages = [];
    socket.emit('changeLanguage', this.translateTo);
  }

  socket.on('message', (message) => {
    $scope.$apply(() => {
      this.messages.push(message);
    });
    $timeout(function() {
      var scroller = document.getElementById("autoscroll");
      scroller.scrollTop = scroller.scrollHeight;
    }, 0, false);                                                                                                 
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
