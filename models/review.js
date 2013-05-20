var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  school: {
    type: Schema.ObjectId,
    ref: 'School'
  },
  rating: Number,
  pros: String,
  cons: String,
  jobStatus: String,
  jobCity: String,
  lengthOfEmployment: Number,
});

module.exports = mongoose.model('Review', reviewSchema);
