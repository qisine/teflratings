var faker = require('Faker'),
    models = require('../models'),
    db = require('../db');
var createSchool = require('./factories/schools.js'),
    createReview = require('./factories/reviews.js');

models.School.find().remove();

var schools = [];
for(var i=0;i < 20; i++) {
  var s = createSchool();
  var iters = faker.random.number(10);
  for(var j=0;j < iters;j++) {
    var r = createReview();  
    s.reviews.push(r);
  }
  schools.push(s);
}
models.School.create(schools, function(err) {
  if(err)
    console.error(err);
  else
    console.log('successfully created %s schools', Array.prototype.slice.call(arguments, 1).length);
});
