var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var db = require('../mongo-db/config.js');
var inputs = require('../mongo-db/inputs.js');
var Speech = require('../Server/speechToText.js')

var app = express();

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json({
    extended: true
}));

var port = process.env.PORT || 5000;

app.post('/log', function(req, res) {
  console.log('req.body.query', req.body.query);
  Speech.streamAudio('./audio.raw', (data)=>{
    if(data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED') {
      res.status(200).send(data.results);
    }
  })
});

app.post('/', function(req, res) {

});

app.listen(port, function() {
  console.log('In space no one can hear you scream', port);
});