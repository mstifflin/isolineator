const fs = require('fs');
const record = require('node-record-lpcm16');


const Speech = require('@google-cloud/speech')({
  projectId: 'Isolineator',
  keyFilename: './Server/SpeechToText/isolineator-a25b826f81b6.json'
});

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
//################for streaming audio from a file###################
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
///////////for direct mic to api//////////////////
  
  exports.liveStreamAudio = (callback) => {
    return Speech.createRecognizeStream(request)
      .on('error', console.error)
      .on('data', (data) => {
        process.stdout.write(data.results)
        callback(data);
      });
  }

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