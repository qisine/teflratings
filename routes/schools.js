var   db = require('../db')
    , ObjectId = db.Types.ObjectId
    , models = require('../models');
var   School = models.School
    , Review = models.Review
    , SchoolSearch = models.SchoolSearch;

module.exports.list = function(req, res, next){
  School.find(function(err, schools) {
    if(err) next(err);
    else res.send(schools);
  });
};

module.exports.show = function(req, res, next) {
  var id = ObjectId(req.params.id);
  School.findOne({_id: id}, function(err, school) {
    if(err) next(err);
    else if (!school) res.send(404, {error: "Record not found! :(" });
    else res.send(school);
  });
}

module.exports.search = function(req, res, next) {
  var schoolSearch = new SchoolSearch(req.query);
  schoolSearch.find(function(err, schools) {
    if(err) next(err);
    else res.send(schools);
  });
}

module.exports.create = function(req, res, next) {
  var school = new School(req.body);
  school.user = req.user.id;
  School.create(school, function(err, school) {
    if(err) next(err);
    else { 
      school.addToUser(function(err, user) {
        if(err) next(err);
        else res.send(school);
      });
    }
  });
}

module.exports.update = function(req, res, next) {
  var   id = ObjectId(req.params.id)
      , school = new School(req.body);
  delete school.reviews;
  School.findOneAndUpdate({_id: id}, school, function(err, school) {
    if(err) next(err);
    else res.send(school);
  });
}

module.exports.destroy = function(req, res, next) {
  var id = ObjectId(req.params.id);
  School.findOneAndRemove({_id: id}, function(err, school) {
    if(err) next(err);
    else { 
      Review.remove({school: school.id}).exec();
      school.removeFromUser(function(err, user) {
        if(err) next(err);
        else res.send(school);
      });
    }
  });
}
