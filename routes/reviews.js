var db = require('../db'),
    ObjectId = db.Types.ObjectId,
    models = require('../models');
var   School = models.School
    , Review = models.Review;

module.exports.list = function(req, res, next){
  Review.find(function(err, reviews) {
    if(err) {
      next(err);
    } else {
      res.send(reviews);
    }
  });
};

module.exports.show = function(req, res, next) {
  var id = ObjectId(req.params.id);
  Review.findOne({_id: id}, function(err, review) {
    if(err) {
      next(err);
    } else if (!review) {
      res.send(404, {error: "Record not found! :(" });
    } else {
      res.send(review);
    }
  });
}

module.exports.create = function(req, res, next) {
  var review = new Review(req.body);
  review.user = req.user.id;
  Review.create(review, function(err, review) {
    if(err) {
      next(err);
    } else { 
      res.send(review);
    }
  });
}

module.exports.update = function(req, res, next) {
  var id = ObjectId(req.params.id);
  delete req.body.school;
  delete req.body.user;
  Review.findOneAndUpdate({_id: id}, req.body, function(err, review) {
    if(err) {
      next(err);
    } else { 
      res.send(review);
    }
  });
}

module.exports.destroy = function(req, res, next) {
  var id = ObjectId(req.params.id);
  Review.findOneAndRemove({_id: id}, function(err, review) {
    if(err) {
      next(err);
    } else { 
      res.send(review);
    }
  });
}
