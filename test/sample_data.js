var faker = require('Faker'),
    models = require('../models')
    db = require('../db');
var createSchool = require('./factories/school.js')
    createAddress = require('./factories/address.js')
    createReview = require('./factories/review.js')

models.forEach(function(e) {
  e.find().remove();
});

for(var i=0;i < 20; i++) {
  var s = createSchool(function(e) {
    
  });
}
