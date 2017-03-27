angular.module('app')
.directive('listItem', function() {
  return {
    scope: {
      log: '<',
      service: '<'
    },
    restrict: 'E',
    controller: function($scope) {
      this.playing = false;
      this.clicked = function() {
        console.log('attempting to play recording');
        this.playing = !this.playing;
        this.service.getFileById(this.log.id, (data) => {
          console.log('data');
        });
      };
      this.stop = function() {
        this.playing = !this.playing;
      };
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/list-item.html'
  };
});