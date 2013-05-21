var   mongoose = require('mongoose')
    , ext = require('./ext')
    , Schema = mongoose.Schema;

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

reviewSchema.plugin(ext.parentSync("School"));
reviewSchema.plugin(ext.parentSync("User"));

module.exports = mongoose.model('Review', reviewSchema);
