var faker = require('Faker'),
    async = require('async'),
    models = require('../models'),
    db = require('../db');
var createSchool = require('./factories/schools.js')
    , createReview = require('./factories/reviews.js')
    , createUser = require('./factories/user.js');

[models.User, models.School, models.Review].forEach(function(m) {
  m.find().remove();
});

async.waterfall([
  function(cb) {
    var users = [];
    for(var i=0;i < 37; i++) users.push(createUser());
    models.User.create(users, function(err) {
      if(err) throw new Error(err);
      else cb(null, Array.prototype.slice.call(arguments, 1));
    });
  },
  function(users, cb) {
    var schools = [];
    for(var i=0;i < 29; i++) schools.push(createSchool(faker.random.array_element(users))); 
    models.School.create(schools, function(err) {
      if(err) throw new Error(err);
      else cb(null, users, Array.prototype.slice.call(arguments, 1));
    });
  },
  function(users, schools, cb) {
    var reviews = [];
    schools.forEach(function(s) {
      var iters = faker.random.number(10);
      for(var i=0; i < iters; i++)
        reviews.push(createReview(faker.random.array_element(users), s));
    });
    models.Review.create(reviews, function(err) {
      if(err) throw new Error(err);
      else cb(null, users, schools, Array.prototype.slice.call(arguments, 1));
    });
  },
  function(users, schools, reviews, cb) {
  },
],
  function(err, result) {
  });
