angular.module('app')
.service('isolineatorService', function($http, $window) {

  this.getAll = function(callback) {
    $http.get('/logs')
    .then(function(data) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.searchLogs = function(query, callback) {
    $http.get('/log')
    .then(function(data) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.postRecording = function(recording, callback) {
    $http.post('/record')
    .then(function(data){
      if(callback) {
        callback(data);
      }
    })
     .catch(function(err) {
      console.log(err);
    });
  };

});