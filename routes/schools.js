var db = require('../db'),
    ObjectId = db.Types.ObjectId,
    models = require('../models');
var School = models.School;

module.exports.list = function(req, res, next){
  School.find(function(err, schools) {
    if(err) {
      next(err);
    } else {
      res.send(schools);
    }
  });
};

module.exports.show = function(req, res, next) {
  var id = ObjectId(req.params.id);
  School.findOne({_id: id}, function(err, school) {
    if(err) {
      next(err);
    } else if (!school) {
      res.send(404, {error: "Record not found! :(" });
    } else {
      res.send(school);
    }
  });
}

module.exports.create = function(req, res, next) {
  console.log('usr->', req.user);
  School.create(req.body, function(err, school) {
    if(err) {
      next(err);
    } else { 
      res.send(school);
    }
  });
}

module.exports.update = function(req, res, next) {
  var id = ObjectId(req.body.id);
  School.findOneAndUpdate({_id: id}, req.body, function(err, school) {
    if(err) {
      next(err);
    } else { 
      res.send(school);
    }
  });
}

module.exports.destroy = function(req, res, next) {
  var id = ObjectId(req.body.id);
  School.findOneAndRemove({_id: id}, function(err, school) {
    if(err) {
      next(err);
    } else { 
      res.send(school);
    }
  });
}
