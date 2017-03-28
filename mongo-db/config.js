var mongoose = require('mongoose');
var fs = require('fs');
var mongoURI = process.env.DB_URL || 'mongodb://localhost/isodb';
mongoose.connect(mongoURI);

var dbconn = mongoose.connection;
dbconn.on('error', console.error.bind(console,'There is an error in db connection'));
dbconn.on('open', function () {
	console.log('MongoDB connection is now open');
});

module.exports.dbconn = dbconn;


