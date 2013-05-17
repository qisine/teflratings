var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Review = require('./review');

var schoolSchema = new Schema({
  englishName: String,
  officialName: String,
  companyNumber: String,
  street: String,
  city: String,
  zip: String,
  country: String,
  reviews: [Review.schema],
  description: String,
});

module.exports = mongoose.model('School', schoolSchema);
