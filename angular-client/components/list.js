angular.module('app')
.controller('listCtrl', function($scope) {
})
.directive('list', function() {
  return {
    scope: {
      logs: '<',
      service: '<'
    },
    restrict: 'E',
    controller: 'listCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/list.html'
  };
});