var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../mongo-db/config.js');
var inputs = require('../mongo-db/inputs.js');
var fs = require('fs');
// var Speech = require('../Server/speechToText.js')

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json({
    extended: true
}));


var port = process.env.PORT || 5000;


app.post('/log', function(req, res) {
  console.log('req.body.query', req.body.query);
  
  let speech = require('@google-cloud/speech')({
    projectId: 'Isolineator',
    keyFilename: './Server/SpeechToText/isolineator-a25b826f81b6.json'
  });

  // var request = {
  //   config: {
  //     encoding: 'LINEAR16',
  //     sampleRate: 16000
  //   },
  //   singleUtterance: false,
  //   interimResults: false
  // };

  // fs.createReadStream('./Test.wav')
  //   .on('error', console.error)
  //   .pipe(speech.createRecognizeStream(request))
  //   .on('error', console.error)
  //   .on('data', function(data) {
  //     console.log(data);
  //   });

  // const recognizeStream = speech.createRecognizeStream(request)
  //   .on('error', console.error)
  //   .on('data', (data) => {
  //     console.log('Data received: ', data);
  //   });
  // fs.createReadStream('./audio.raw').pipe(recognizeStream);

  // res.status(201).send();
  
  let options = {
    encoding: 'LINEAR16',
    sampleRate: 16000
  };
  
  speech.recognize('./Server/Test.wav', options)
  .then((results) => {
    const transcription = results[0];
    console.log(`Transcription: ${transcription}`);
  })
  .then((data) => {
    res.status(201).send();
  })
  .catch((err) => {
    console.log(err);
  });
});

app.post('/', function(req, res) {

});

app.listen(port, function() {
  console.log('In space no one can hear you scream', port);
});