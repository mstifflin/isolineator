angular.module('app')
.service('isolineatorService', function($http, $window) {

  this.getAll = function(callback) {
    $http.get('/logs')
    .then(function({data}) {
      if(callback) {
        callback(data);
      }
    })
    .catch(function({err}) {
      console.log(err);
    });
  };

  this.searchLogs = function(query, callback) {
    var req = {};
    req.query = query;

    $http({
      method: 'POST',
      url: '/log', 
      data: JSON.stringify(req)
    })
    // $http.get('/log')
    .then(function(data) {
      console.log('success');
      if(callback) {
        callback(data);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.postRecording = function(filename, recording, date, callback) { 
    // var req = {};
    // req.filename = filename;
    // req.recording = recording;
    // req.date = date;
    // console.log('attempt to post from items...');
    // console.log('req before post', req);
    // console.log('stringified Request', JSON.stringify(req));

    // $http({
    //   method: 'POST',
    //   url: '/record', 
    //   data: req
    // })
    // .then(function(data) {
    //   console.log('posted in original postrecording');
    //   if (callback) {
    //     callback(data);
    //   }
    // })
    //  .catch(function(err) {
    //    console.log('error in postRecording', err);
    //  });

    var formData = new FormData();
    formData.append('filename', filename);
    formData.append('recording', recording);

    console.log('get all file names ', formData.getAll('filename'));
    console.log('get recordings', formData.getAll('recording'));

    console.log('Form data:', formData);

    $http({
      method: 'POST',
      url: '/record', 
      data: formData,
      contentType: 'multipart/form-data',
      processData: false
    })
    .then(function(data) {
      console.log('posted in original postrecording');
      if (callback) {
        callback(data);
      }
    })
     .catch(function(err) {
       console.log('error in postRecording', err);
     });


  };

});