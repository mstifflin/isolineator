angular.module('app')
.controller('LangCtrl', function($scope, isolineatorService) {

  this.listStyle = {
    'overflow': 'scroll',
    'height': '300px'
  }
  
  this.lang;

  this.currentCode = 'enMessage';
  this.currentLang = 'English';
  
  isolineatorService.getChatLang((data) => {
    this.lang = data.data;
  });

  this.onClick = (newLang) => {
    this.currentLang = newLang.name;
    this.currentCode = newLang.code;
  }
})
.directive('listlang', function() {
  return {
    restrict: 'E',
    controller: 'LangCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/listchatlang.html'
  }
});