angular.module('app')
.controller('ChatCtrl', function($scope, $timeout, isolineatorService) {
  var socket = io();
  this.messageText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = {};
  this.newMessage = {};
  this.chatrooms = ['lobby'];
  this.chatroom = 'lobby';
  this.chatting = true;
  this.promptPassword = false;
  this.roomPassword = '';

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

  socket.on('isTyping', (userInfo) => {
    var status = userInfo.username + ' is typing...'
    $scope.$apply(() => {
      if (this.otherUserIsTyping === status) {
        this.stallClear = true;
      } else {
        if (this.chatroom === userInfo.room) {
          this.otherUserIsTyping = status;
          this.stallClear = false;
        }
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
    this.messages[this.chatroom] = [];
    socket.emit('changeLanguage', {
      code: this.translateTo,
      room: this.chatroom 
    }); 
  }

  socket.on('message', (message) => {
    console.log('receiving??? ', message);
    $scope.$apply(() => {
      if (!this.messages[message.room]) { 
        this.messages[message.room] = []; 
      }
      if (this.chatroom !== message.room) {
        this.newMessage[message.room] = true;
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

  this.goToRoom = (roomname) => {
    if (this.chatrooms.includes(roomname)) {
      this.joinRoom(roomname, this.chatroom);
    } else {
      isolineatorService.getRoom(roomname, (err, room) => {
        if (err) {
          if (err.status === 404) {
            this.roomPassword = '';
            this.promptPassword = true;
          }
        }
        else {
          if (room.password) {
            this.roomPassword = room.password;
            this.promptPassword = true;
          } else {
            this.roomPassword = '';
            this.roomError = '';
            this.chatrooms.push(room.chatroom);
            this.joinRoom(room.chatroom, this.chatroom);
            $timeout(function(){
              $scope.activeTabIndex = this.chatrooms.length;
              this.changeRoom(room.chatroom);
            }.bind(this));
          }
        }
      });
    }
  }

  this.createRoom = (roomname) => {
    var roomObj = { 
      chatroom: roomname, 
      password: this.password || null 
    };
    isolineatorService.createRoom(roomObj, (err, newRoom) => {
      if (err) {
        // set error message on screen
        console.log(err);
      } else {
        this.password = '';
        this.roomPassword = '';
        this.roomError = '';
        this.promptPassword = false;
        this.chatrooms.push(newRoom.chatroom);
        this.joinRoom(newRoom.chatroom, this.chatroom);
      }
    });
  }

  this.validatePassword = (roomname) => {
    if (this.password === this.roomPassword) { 
      this.password = '';
      this.roomPassword = '';
      this.roomError = '';
      this.promptPassword = false;
      this.chatrooms.push(roomname);
      this.joinRoom(roomname, this.chatroom);
    } else {
      this.roomError = 'Incorrect password.';
      this.password = '';
    }
  }

  this.changeRoom = (room) => {
    this.chatroom = room;
    this.newMessage[room] = false;
  }

  this.joinRoom = (newRoom) => {
    console.log('new room in join room: ', newRoom);
    socket.emit('subscribe', newRoom);
    this.chatroom = newRoom;
    this.addRoom = false;
    this.newRoom = '';
    $timeout(function(){
      $scope.activeTabIndex = this.chatrooms.length;
    }.bind(this));
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
