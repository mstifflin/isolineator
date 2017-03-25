var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;
var Grid = require('gridfs-stream');
var db = require('./config.js');
Grid.mongo = mongoose.mongo;
var gfs = Grid(db.dbconn.db);




exports.saveInputFile = (audFilePath, transcribedData, topic, metaData, callBack) => {
// not handeling metaData right now. not adding entry numbers

  var writestream = gfs.createWriteStream({
    filename: topic,
    metadata: {
    	text: transcribedData
    }
  });

  fs.createReadStream(audFilePath).pipe(writestream);

  writestream.on('close', function (file) {
    console.log(file.filename + ' - Written To DB');
    if (callBack !== undefined) {
    	callBack(file);
    }
  });

}

exports.consoleLogAllDataBase = () => {
  gfs.files.find().toArray(function (err, files) {
    if (err) {
         throw (err);
    }
    console.log(files);
  });
}
