angular.module('app')
.controller('AppCtrl', function($scope, isolineatorService) {

  var socket = io.connect('http://127.0.0.1:5000');

  isolineatorService.getAll((data) => {
    this.logs = data;
  });

  socket.on('transcription', (data, trans) => {
    // console.log('transcription:', data);
    // console.log(trans)
    if (Array.isArray(data.results) && data.results[0].transcript !== undefined) {
      console.log(data.results[0].isFinal)
      this.text = data.results[0].transcript;
      this.translate = trans;
    } else {
      this.text = data.results;
      this.translate = trans;
    }
  });
  
  this.logs = [
    { __v: 0,
      vtext: 'go away',
      topic: 'grumpy',
      createdAt: '2017-03-16T05:08:52.020Z',
      _id: '58ca1de4f29fc9ab6188f066' 
    },
    { __v: 0,
      vtext: 'hi there',
      topic: 'hi',
      createdAt: '2017-03-16T05:08:52.009Z',
      _id: '58ca1de4f29fc9ab6188f065' 
    }
  ]

  console.log('logs', this.logs);

  this.recording = false;
  this.record = () => {
    this.recording = !this.recording;
  }

  this.service = isolineatorService;
  this.searchResults = (data) => {
    this.logs = data;
  }

})

.directive('app', function() {
  return {
    scope: {},
    restrict: 'E',
    controller: 'AppCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'templates/app.html'
  }

})


