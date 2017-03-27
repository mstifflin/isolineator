angular.module('app')
.controller('LogCtrl', function($scope) {
})
.directive('historylog', function() {
  return {
    scope: {
      service: '<',
      result: '=',
      logs: '<'
    },
    controller: 'LogCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/historylog.html'
  };
});