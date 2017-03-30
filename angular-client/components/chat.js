angular.module('app')
.controller('ChatCtrl', function($scope, isolineatorService) {
  var socket = io();
  this.englishText = '';
  this.foreignText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = [];
  isolineatorService.getChatLang((data) => {
    this.languages = data.data;
  });

  this.sendMessage = () => {
    if (this.foreignText) {
      var message = { 
        username: this.username,
        text: this.foreignText,
        langCode: this.translateTo
      };
      socket.emit('message', message);
      this.foreignText = '';
    }
  };

  this.changeLanguage = () => {
    socket.emit('changeLanguage', this.translateTo);
  }

  socket.on('message', (message) => {
    $scope.$apply(() => {
      this.messages.push(message);
    });
  });
  
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


