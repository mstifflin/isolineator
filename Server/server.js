var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('../mongo-db/config.js');
var inputs = require('../mongo-db/inputs.js');

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json({
    extended: true
}));


var port = process.env.PORT || 5000;


app.post('/log', function(req, res) {
  console.log('req.body.query', req.body.query);
  res.status(201);
});

app.post('/', function(req, res) {

});

app.listen(port, function() {
  console.log('In space no one can hear you scream');
});