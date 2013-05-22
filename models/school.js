var   mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ext = require("./ext")
    , User = require('./user');

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

schoolSchema.plugin(ext.parentSync(User));

module.exports = mongoose.model('School', schoolSchema);
