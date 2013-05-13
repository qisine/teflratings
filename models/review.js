var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  userName: String,
  company: Schema.Types.ObjectId,
  rating: Number,
  pros: String,
  cons: String,
  jobStatus: String,
  jobCity: String,
  lengthOfEmployment: String,
});

module.exports = mongoose.model('Review', reviewSchema);
