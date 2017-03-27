angular.module('app')
.directive('search', function() {
  return {
    scope: {
      result: '=',
      service: '<',
      logs: '='
    },
    controller: function($scope) {
      this.clicked = function() {
        if (this.input === undefined || this.input.length === 0) {
          this.service.getAll((data) => {
            this.logs = data;
          });
        } else {
          this.service.getFileByTopic(this.input, (data) => { 
            this.result(data.data); 
          });
        }
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/search.html'
  };
});