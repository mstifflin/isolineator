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

exports.consoleAllDataBase = () => {
	// var readstream = gfs.createReadStream({
	// filename: 'chris.wav',
 //     metadata: {
 //        	topic: 'Chris says hello too'
 //     }
 //  });

  gfs.files.find().toArray(function (err, files) {
    if (err) {
         throw (err);
    }
    console.log(files);
  });
  // readstream.pipe(fs_write_stream);
}










// var inputsSchema = mongoose.Schema({
// 	//id: Number, no need for id as mongoose auto creates _id for each schema
// 	vtext: String,
// 	topic: String,
// 	createdAt: Date
// });

// var Inputs = mongoose.model('inputs', inputsSchema);

// var input1 = new Inputs({
// 	vtext: 'hi there',
// 	topic: 'hi',
// 	createdAt: new Date()
// });

// input1.save(function (err, newInput) {
// 	if (err) {
// 		console.log('error in input1 save : ', err);
// 	} else {
// 		console.log('input 1 now inserted: ', newInput);
// 	}
// });


// var input2 = new Inputs({
// 	vtext: 'go away',
// 	topic: 'grumpy',
// 	createdAt: new Date()
// });

// input2.save(function (err, newInput) {
// 	if (err) {
// 		console.log('error in input2 save : ', err);
// 	} else {
// 		console.log('input 2 now inserted: ', newInput);
// 	}
// });

// module.exports.Inputs = Inputs;