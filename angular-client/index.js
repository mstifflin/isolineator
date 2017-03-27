angular.module('app', ['angularAudioRecorder', 'ui.bootstrap', 'ngAnimate', 'angular-loading-bar'])
    .controller('AppController', function ($scope, $timeout) {
      console.log('Loaded');
      $scope.timeLimit = 100;
    }).config(function (recorderServiceProvider) {
      recorderServiceProvider
      .forceSwf(false)
      .withMp3Conversion(false);
    })
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.parentSelector = '.text';
    }]);