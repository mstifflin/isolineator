angular.module('app')
.controller('AppCtrl', function($scope, $timeout, isolineatorService) {

  var socket = io.connect();

  isolineatorService.getAll((data) => {
    this.logs = data;
  });

  socket.on('transcription', (data, trans) => {
      this.text = data;
      this.translate = trans;
  });

  this.recording = false;
  this.record = () => {
    this.recording = !this.recording;
  }

  this.service = isolineatorService;
  this.searchResults = (data) => {
    this.logs = data;
  }

  this.histclicked = () => {
      this.service.getAll((data) => {
      this.logs = data;
    });
  }
})

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'AppCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/app.html'
  }

})


