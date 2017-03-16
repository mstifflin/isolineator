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

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.post('/log', function(req, res) {
  console.log('req.body.query', req.body.query);
  res.status(201);
});

app.post('/', function(req, res) {

});

app.listen(3000, function() {
  console.log('In space no one can hear you scream');
});