var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/isodb';
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('err', console.err.bind(console,'There is an error in db connection'));
db.in('open', function () {
	console.log('MongoDB connection is now oepn');
});

module.exports.db = db;