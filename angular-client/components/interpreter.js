angular.module('app')
.controller('InterCtrl', function($scope) {
    })
.directive('interpreter', function() {
  return {
    scope: {
      text: '<',
      translate: '<'
    },
    controller: 'InterCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/interpreter.html'
  };
});