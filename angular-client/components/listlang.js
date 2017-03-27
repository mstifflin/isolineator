angular.module('app')
.controller('LangCtrl', function($scope, isolineatorService) {

  this.listStyle = {
    'overflow': 'scroll',
    'height': '300px'
  }
  
  //CHOOSE THIS FOR JUST 4 LANG
  // this.lang = [
  //   { code: 'zh', name: 'Chinese (Simplified)' },
  //   { code: 'tl', name: 'Filipino' },
  //   { code: 'hi', name: 'Hindi' },
  //   { code: 'es', name: 'Spanish' }
  // ];

  //CHOOSE THIS FOR ALL LANG
  this.lang;


  this.currentCode = 'es';
  this.currentLang = 'Spanish';
  
  isolineatorService.getLang((data) => {
    //UN-COMMENT LINE:21 TO ENABLE ALL LANG
    this.lang = data.data;
  });

  this.onClick = (newLang) => {
    this.currentLang = newLang.name;
    this.currentCode = newLang.code;
    console.log(this.currentLang, this.currentCode);
  }
})
.directive('listlang', function() {
  return {
    restrict: 'E',
    controller: 'LangCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: '/templates/listlang.html'
  }
});