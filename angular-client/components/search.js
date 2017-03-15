angular.module('app')

.directive('search', function() {
  return {
    scope: {
      result: '<'
    },
    controller: function(youTube) {
      this.clicked = function() {
        youTube.search(this.input, (data) => { this.result(data); });
      };
      
      
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/search.html'
  };
});