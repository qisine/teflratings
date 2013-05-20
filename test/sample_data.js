var faker = require('Faker'),
    async = require('async'),
    utils = require('../utils'),
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
    for(var i=0;i < 10; i++) users.push(createUser());
    models.User.create(users, function(err) {
      if(err) throw new Error(err);
      console.log('users created');
      cb(null, utils.getArgs(arguments));
    });
  },
  function(users, cb) {
    var schools = [];
    for(var i=0;i < 20; i++) schools.push(createSchool(faker.random.array_element(users))); 
    models.School.create(schools, function(err) {
      if(err) throw new Error(err);
      console.log('schools created');
      cb(null, users, utils.getArgs(arguments));
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
      console.log('reviews created');
      cb(null, users, schools, utils.getArgs(arguments));
    });
  },
  function(users, schools, reviews, cb) {
    async.each(schools, function(s, cb2) {
      models.Review.find({school: s.id}, function(err, reviews) {
        if(err) throw new Error(err);
        
        var ids = reviews.map(function(r) { return r.id });
        models.School.update(s, { $pushAll: { reviews: ids } }, function(err) {
          if(err) throw new Error(err);
          cb2();
        });
      });
    }, function(err) {
        if(err) throw new Error(err);
        cb(null, users, schools, reviews);
    });
  },
  function(users, schools, reviews, cb) {
    async.each(users, function(u, cb2) {
      models.School.find({user: u.id}, function(err, schools) {
        if(err) throw new Error(err);

        var ids = schools.map(function(r) { return r.id });
        models.User.update(u, { $pushAll: { schools: ids } }, function(err) {
          if(err) throw new Error(err);
          models.Review.find({user: u.id}, function(err, reviews) {
            var ids = reviews.map(function(r) { return r.id });
            models.User.update({_id: u.id}, { $pushAll: { reviews: ids } }, function(err) {
              if(err) throw new Error(err);
              cb2();
            });
          });
        });
      });
    }, function(err) {
        if(err) throw new Error(err);
        cb(null);
    });
  },
], function(err, result) {
  console.log('Successfully created test data');
});
