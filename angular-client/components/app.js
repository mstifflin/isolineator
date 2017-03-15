angular.module('app')
.controller('AppCtrl', function(itemsService) {
  // itemsService.getAll((data) => {
  //   this.items = data;
  // });
})
.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller, 'AppCtrl',
    controllerAs: 'ctrl',
    bindToConteroller: true,
    templateUrl: 'templates/app.html'
  }
})