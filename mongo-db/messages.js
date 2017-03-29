var mongoose = require('mongoose');

var MessagesSchema = mongoose.Schema({
  username: String,
  origMessage: String,
  chatroom: String,
  createdAt: String,
  originalLang: String,
  arMessage: String, //Arabic
  cnMessage: String, //Simplified Chinese
  enMessage: String, //English
  frMessage: String, //French
  deMessage: String, //German
  jaMessage: String, //Japanese
  koMessage: String, //Korean
  ruMessage: String, //Russian
  esMessage: String //Spanish
});

var Message = mongoose.model('Message', MessagesSchema);

var ChatroomsSchema = mongoose.Schema({
  chatroom: String,
  password: String
});

var Chatroom = mongoose.model('Chatroom', ChatroomsSchema);
