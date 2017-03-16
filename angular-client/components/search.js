angular.module('app')

.directive('search', function() {
  return {
    scope: {
      result: '<',
      service: '<'
    },
    controller: function() {
      this.clicked = function() {
        this.service.searchLogs(this.input, (data) => { this.result(data); });
      };
      
      
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/search.html'
  };
});