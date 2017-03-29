
angular.module('app')
.controller('ChatCtrl', function($scope) {
    var socket = io();
    this.englishText = '';
    this.messages = [];

    this.sendEnglishText = (text) => {
        socket.emit('message', text);
    };

    // $scope.apply(() => {
        socket.on('message', (message) => {
            this.messages.push(message);
        })
    // })
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


