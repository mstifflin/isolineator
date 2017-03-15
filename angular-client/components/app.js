angular.module('app')
.controller('AppCtrl', function($window) {
  // itemsService.getAll((data) => {
  //   this.items = data;
  // });
  // this.logs = $window.exampleTextData;
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

//minor change

