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

app.set('port', 5000)

app.get('/', function(req, res) {

});

app.post('/', function(req, res) {

});

app.listen(5000, function() {
  console.log('In space no one can hear you scream');
});