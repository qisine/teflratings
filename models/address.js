var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  street: String,
  city: String,
  zip: String,
  country: String,
});

module.exports = mongoose.model('Address', addressSchema);
