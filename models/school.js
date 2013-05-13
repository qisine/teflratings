var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
  name: String,
  chineseName: String,
  companyNumber: String,
  address: Schema.Types.ObjectId,
  description: String,
});

module.exports = mongoose.model('School', schoolSchema);
