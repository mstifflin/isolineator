angular.module('app')
.controller('AppCtrl', function($scope) {
  // isolineatorService.getAll((data) => {
  //   this.logs = data;
  // });
  
  this.logs = [
    {
      text:"Hello there",
    },
    {
      text: "Hi again"
    }
  ]

  console.log('logs', this.logs);

})

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'AppCtrl',
    controllerAs: 'ctrl',
    bindToConteroller: true,
    templateUrl: 'templates/app.html'
  }

})


