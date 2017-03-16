angular.module('app')
.controller('AppCtrl', function($scope, isolineatorService) {
  isolineatorService.getAll((data) => {
    this.logs = data;
  });
  
  this.logs = [
    {
      text:"Hello there",
    },
    {
      text: "Hi again"
    }
  ]

  console.log('logs', this.logs);

  this.recording = false;
  this.record = () => {
    // console.log('toggling');
    this.recording = !this.recording;
  }

  this.searchService = isolineatorService;
  this.searchResults = (data) => {
    this.logs = data;
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


