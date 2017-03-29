angular.module('app')
.controller('ChatCtrl', function($scope, isolineatorService) {
  var socket = io();
  this.englishText = '';
  this.foreignText = '';
  this.username = '';
  this.translateTo = 'en';
  this.messages = [];
  isolineatorService.getLang((data) => {
    this.languages = data.data;
    console.log('languages', this.languages.length);
  });

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
    isolineatorService.translateText(text, this.translateTo)
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


