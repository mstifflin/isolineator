angular.module('app')
.controller('CountryCtrl', function($scope, isolineatorService) {
})
.directive('country', function() {
  return {
    scope: {
      country: '<',
      onClick: '<'
    },
    restrict: 'E',
    controller: 'CountryCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/country.html'
  }
});