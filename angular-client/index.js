angular.module('app', ['angularAudioRecorder', 'ui.bootstrap', 'ngAnimate', 'angular-loading-bar'])
    .controller('AppController', function ($scope, $timeout) {
      console.log('Loaded');
      $scope.timeLimit = 100;


    }).config(function (recorderServiceProvider) {
      recorderServiceProvider
      .forceSwf(false)
      //.setSwfUrl('/lib/recorder.swf')
      .withMp3Conversion(false)
    ;

    })
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      // cfpLoadingBarProvider.includeBar = false;
      cfpLoadingBarProvider.parentSelector = '.text';
    }]);