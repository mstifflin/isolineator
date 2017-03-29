angular.module('app')
.controller('ChatCtrl', function($scope, isolineatorService) {
  var socket = io();
  this.englishText = '';
  this.foreignText = '';
  this.username = '';
  this.messages = [];

  this.sendEnglishText = (text, username) => {
      socket.emit('message', {message: text, username: username});
      this.englishText = '';
  };

  socket.on('message', (message) => {
    $scope.$apply(() => {
      this.messages.push(message);
    });
  })

  this.translate = (text) => {
    isolineatorService.translateText(text, 'en')
    .then(o => {
      this.englishText = o.data;
      this.foreignText = '';
    });
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


