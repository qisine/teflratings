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
  description: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  reviews: [{
    type: Schema.ObjectId,
    ref: 'Review'
  }],
});

module.exports = mongoose.model('School', schoolSchema);
