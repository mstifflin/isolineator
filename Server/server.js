const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const fs = require('fs');
const Stream = require('stream');
const record = require('node-record-lpcm16');
const request = require('request');
const multer = require('multer');
const dbconn = require('../mongo-db/config.js');
const inputs = require('../mongo-db/inputs.js');
const Speech = require('../Server/speechToText.js');
const t2s = require('../Server/textToSpeech.js');
const {Translater, listLanguages, translateMessage} = require('./TextTranslateApi.js');
const {getMessages, createRoom, getRoomByName} = require('../mongo-db/messages.js');

const io = require ('socket.io')(server);
const socketManager = require('./sockets.js')(io);
  

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));

app.use(bodyParser.json({
 extended: true
}));


//trying to figure out why the files aren't saving to uploads, continue from here
var storage = multer.diskStorage({
 destination: function (req, file, cb) {
   cb(null, 'Uploads/');
 },
 filename: function (req, file, cb) {
   var date = new Date().toISOString();
   cb(null, file.fieldname + '-' + date + '.wav');
 }
});

var upload = multer({ storage: storage });

var port = process.env.PORT || 5000;

app.get('/log', function(req, res) {
  inputs.returnAllRecords(function(arrOfRecords) {
    res.status(201).json(arrOfRecords);
  });
});

app.get('/getFileByTopic', function(req, res) {
  inputs.getRecordByTopic(req.query.query, (arrOfRecords) => {
    res.status(201).json(arrOfRecords);
  });
});

app.get('/getFileById', function(req, res) {
  inputs.getRecordById(req.query.id, (readstream) => {
    readstream.pipe(res);
  });
});

app.post('/record', upload.single('recording'), function(req, res) {
  Speech.syncAudio(`./${req.file.path}`, (data)=>{
    console.log('saving file')
    inputs.saveInputFile(`./${req.file.path}`, data, req.file.originalname, {}, (file) => {
    }); 
  });
  res.status(201).end();
});

app.post('/onEnd', upload.single('recording'), function(req, res) {
  let translateFrom = req.body.translateFrom;
  let translateTo = req.body.translateTo;
  let socketId =  req.body.socketId;

  Speech.syncAudio(`./${req.file.path}`, translateFrom, (text)=>{
    Translater(text, translateTo, (translate) => {
      io.to(socketId).emit('transcription', text, translate);
      t2s.getSpeechStreamFromChunks(translate, translateTo, (err, data) => { //translate should be equal to the final translated text
        if (err) {
          console.log(err.code)
        } else if (data) {
          if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough();
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream);
            // Pipe into Player
            bufferStream.pipe(res);
            bufferStream.on('end', () => {
              fs.unlink(`./${req.file.path}`);
              res.status(201).end();
            });
          }
        }
      });
    });
  });
});

app.get('/getLang', (req, res) => {
  listLanguages((lang) => {
    res.status(200).send(lang)
  })
});

app.get('/rooms/:room', (req, res) => {
  let roomname = req.params.room;
  getRoomByName(roomname, (err, room) => {
    if (err) {
      res.statusCode(500);
    } else if (!room) {
      res.statusCode(404);
    } else {
      res.status(200).send(room);
    }
  });
});

app.post('/rooms', (req, res) => {
  createRoom({ chatroom: req.body.roomname , password: req.body.password }, (err) => {

  });
});

app.get('/getChatLang', (req, res) => {
  var languages = [
    {code: 'ar', name: 'Arabic'},
    {code: 'zh-CN', name: 'Simplified Chinese'},
    {code: 'de', name: 'German'},
    {code: 'en', name: 'English'},
    {code: 'fr', name: 'French'},
    {code: 'ja', name: 'Japanese'},
    {code: 'ko', name: 'Korean'},
    {code: 'ru', name: 'Russian'},
    {code: 'es', name: 'Spanish'}
  ];
  res.send(JSON.stringify(languages));
});

app.post('/inputLang', Speech.updateLanguage);

server.listen(port, function () {
 console.log('server listening to', port);
});

// var translated = {
//   arMessage: 'ar', 
//   chMessage: 'zh-CN', 
//   deMessage: 'de', 
//   enMessage: 'en', 
//   frMessage: 'fr', 
//   jaMessage: 'ja',
//   koMessage: 'ko', 
//   ruMessage: 'ru', 
//   esMessage: 'es'
// };

//needs: req.body.username, req.body.chatroom, req.body.message, req.body.toLang
app.get('/testTranslate', translateMessage);

//needs: 'req.body.chatroom' and 'req.body.toLang' (the language to retrieve, must be a key (not value) from the obj above)
app.get('/testGetMessages', getMessages);








































/***************************************************

Unused Routes:

####
Creates a direct data stream from the user's microphone into the Speech-to-text API
RETURNS the transcribed text string when the user is done talking

!!!!>>>MAIN ROUTE TO BE USED FOR PIPING AUDIO FROM FRONT-END TO SERVER<<<!!!

app.post('/testStream', function(req, res) {
  // res.status(201).send();

  var transcribeText = '';

  record.start({
    sampleRate: 16000,
    threshold: 0
    // verbose: true
  })
  .pipe(Speech.liveStreamAudio((data) => {
    console.log(data);
   
    if(Array.isArray(data.results) && data.results[0] !== undefined && data.results[0] !== '') {
      Translater(data.results[0].transcript, 'es', (translate) =>{
        io.emit('transcription', data, translate);
        // console.log(data); 
      })
    }else if(typeof data.results === 'string'){
      Translater(data.results, 'es', (translate) =>{
        io.emit('transcription', data, translate);
      })
    }
   
    if(Array.isArray(data.results) && data.results.length > 0 && data.results[0].isFinal) {
      transcribeText += data.results[0].transcript;
    } else if (typeof data.results === 'string' && data.results.length > 0) {
      transcribeText = data.results
    }
  })
    .on('end', () => {
      console.log('This is the end of transcribing');

      //Apurva's text to voice
      Translater(transcribeText, 'es', (translate) => {
        io.emit('transcription', transcribeText, translate);

        //Apurva's function goes here
        t2s.getSpeechStreamFromChunks(translate, (err, data) => { //translate should be equal to the final translated text
          if (err) {
            console.log(err.code)
          } else if (data) {
            console.log('inside data of getSpeechStreamFromChunks');
            if (data.AudioStream instanceof Buffer) {
              // Initiate the source
              var bufferStream = new Stream.PassThrough();
              // convert AudioStream into a readable stream
              bufferStream.end(data.AudioStream);
              // Pipe into Player
              bufferStream.pipe(res);
              bufferStream.on('end', () => {
                res.status(201).end();
              });
            }
          }
        });
      });
    })
    .on('error',function() {
      console.log('this is the big error', arguments);
    })
  );
});


####
Route to be sued if using the 'record' module to pipe audio 

app.post('/stopStream', function (req, res) {
 record.stop();
 io.on('remove', function() {
   // io.disconnect();
   console.log('socket should be disconnected');
 });
 res.status(201).end();
});




####
Transcribes a local audio file that already exisits
RETURN the transcribed text string when done

app.post('/testFile', function(req, res) {
  Speech.syncAudio('./uploads/recording-2017-03-24T20:59:40.825Z.wav',(data)=>{
    console.log(data);
    res.status(201).send(data);
    // if(data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED') {
    //   res.status(201).send(data.results[0].transcript);
    // }
  });
});


####
Creates a file first, THEN transcribes the audio from the file
RETURNS the transcribed text string.
first audio create wave file, then transcribes

app.post('/testCreate', (req, res) => {
 record.start({
   sampleRate: 44100,
   threshold: 0.5,
   verbose: true
 })
 .pipe(Speech.createAndStream('./Server/audio/test.wav', (data) => {
   if(data.endpointerType === 'ENDPOINTER_EVENT_UNSPECIFIED') {
     res.status(201).end(data.results[0].transcript);
   }
 }));
});


******************************************************/
