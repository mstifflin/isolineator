angular.module('app')
.controller('ChatCtrl', function($scope, $timeout, isolineatorService) {
  var socket = io();
  this.messageText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = {};
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

  socket.on('connect', () => {
    isolineatorService.setSocketId(socket.id);
  });

  this.isTyping = () => {
    socket.emit('isTyping', {
      username: this.username || 'anonymous',
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
    socket.emit('changeLanguage', {
      code: this.translateTo,
      room: this.chatroom 
    }); 
  }

  socket.on('message', (message) => {
    $scope.$apply(() => {
      if (!this.messages[message.room]) { 
        this.messages[message.room] = []; 
      }
      
      this.messages[message.room].push(message);
    });
    $timeout(function() {
      var scrollers = document.getElementsByClassName("autoscroll");
      for (var i = 0; i < scrollers.length; i++) {
        var scroller = scrollers[i];
        scroller.scrollTop = scroller.scrollHeight;
      }
    }, 0, false);
  });
  
  this.toggleAddRoom = () => {
    this.addRoom = !this.addRoom;
  }

  this.createNewRoom = (roomname) => {
    isolineatorService.getRoom(roomname, (err, room) => {
      // if (err) this.roomError = err;
      if (err) console.log(err);
      else {
        if (room.password) {
          // prompt for password and validate
          // this.askPassword;
        }
        this.chatrooms.push(room.chatroom);
        this.chatroom = room.chatroom;
      }
    });
    this.joinRoom(roomname, this.chatroom);
    this.chatroom = roomname;
    this.addRoom = false;
    this.newRoom = '';
    $timeout(function(){
      $scope.activeTabIndex = this.chatrooms.length;
    }.bind(this));
  }

  this.changeRoom = (room) => {
    this.chatroom = room;
  }

  this.joinRoom = (newRoom) => {
    socket.emit('subscribe', newRoom);
  }

  this.leaveRoom = (chatroom) => {
    socket.emit('unsubscribe', chatroom);
    this.chatrooms.forEach(function(room, index) {
      if (chatroom === room) {
        this.chatrooms.splice(index, 1);
        $timeout(function(){
          $scope.activeTabIndex = 0;
        });
        this.chatroom = null;
        return;
      }
    }.bind(this));
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
