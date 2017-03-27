const AWS = require('aws-sdk');
const Stream = require('stream');
const Voices = require('./voices.js');

AWS.config.loadFromPath('./APIs/isolineatorCreds.json');

var polly = new AWS.Polly();

exports.createSpeechFileFromChunks = (chunk, fileName, callBack) => {
  var params = {
    OutputFormat: 'mp3',               // You can also specify pcm or ogg_vorbis formats.
    Text: ''+chunk,     // This is where you'll specify whatever text you want to render.
    VoiceId: 'Miguel'                   // Specify the voice ID / name from the previous step.
  };
  var synthCallback = function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    fs.writeFile(fileName + '.mp3', data.AudioStream, function (err) {
      if (err) { 
        console.log('An error occurred while writing the file.', err);
      }
    });
  };

// Call the synthesizeSpeech() API, and write the result to a file
polly.synthesizeSpeech(params, synthCallback);
}

exports.getSpeechStreamFromChunks = (chunk, langCode, callBack) => {
  var voiceId = 'Miguel';
  Voices.voices.forEach((voice) => {
    if (voice.LanguageCode.indexOf(langCode) === 0) {
      voiceId = voice.Id;
    }
  });
	var params = {
    OutputFormat: 'mp3',               
    Text: ''+chunk,     // This is where you'll specify whatever text you want to render.
    VoiceId: voiceId                   
  };
  var synthCallback = callBack;
  polly.synthesizeSpeech(params, synthCallback);
}