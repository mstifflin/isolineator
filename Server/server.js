var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../angular-client'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(bodyParser.json({
    extended: true
}));


app.get('/', function(req, res) {

});

app.post('/', function(req, res) {

});

app.listen(3000, function() {
  console.log('In space no one can hear you scream');
});