const fs = require('fs');

const Speech = require('@google-cloud/speech')({
  projectId: 'Isolineator',
  keyFilename: './Server/SpeechToText/isolineator-a25b826f81b6.json'
});

const fileName = './Test.m4a';

const options = {
  encoding: 'LINEAR16',
  sampleRate: 16000
};

const request = {
  config: {
    encoding: 'LINEAR16',
    sampleRate: 16000
  },
  singleUtterance: false,
  interimResults: false
};
//################STREAMING AUDIO###################
  exports.streamAudio = (file, callback) => {
    fs.createReadStream(file)
    .on('error', console.error)
    .pipe(Speech.createRecognizeStream(request))
    .on('error', console.error)
    .on('data', function(data) {
      console.log(data);
      callback(data)
    })
  };
//////////////Same functions///////////////
  // const recognizeStream = speech.createRecognizeStream(request)
  //   .on('error', console.error)
  //   .on('data', (data) => {
  //     console.log('Data received: ', data);
  //   });
  // fs.createReadStream('./audio.raw').pipe(recognizeStream);

  // res.status(201).send();
//#######################################

//################normal synchronus####################
  exports.syncAudio = (file, callback) => {
    Speech.recognize(file, options)
    .then((results) => {
      const transcription = results[0];
      console.log(`Transcription: ${transcription}`);
      return transcription; 
    })
    .then((data) => {
      callback(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
//##########################################