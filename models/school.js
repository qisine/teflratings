var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schoolSchema = new Schema({
  englishName: String,
  officialName: String,
  companyNumber: String,
  address: Schema.Types.ObjectId,
  description: String,
});

module.exports = mongoose.model('School', schoolSchema);
