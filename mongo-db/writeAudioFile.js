const mongoose = require('mongoose');




const Schema = mongoose.Schema;
const {InputsSchema} = inputsSchema;
const fs = require('fs');
const Grid = require('gridfs-stream');
mongoose.connect('mongodb://localhost/isodb');
const conn = mongoose.connection;
// mongoose.connect('mongodb://127.0.0.1/test');
 

// Grid.mongo = mongoose.mongo;
 
// conn.once('open', function () {
//     console.log('open');
//     const gfs = Grid(conn.db);
 
//     // streaming to gridfs
//     //filename to store in mongodb
//     const writestream = gfs.createWriteStream({
//         filename: 'mongo_file.txt'
//     });
//     fs.createReadStream('/Users/michael/hr/Week5/isolineator/mongo-db/textFiles/textFile1').pipe(writestream);
 
//     writestream.on('close', function (file) {
//         // do something with `file`
//         console.log(file.filename + 'Written To DB');
//     });
// });