var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    index: true,
  },
  name: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model('User', userSchema);
