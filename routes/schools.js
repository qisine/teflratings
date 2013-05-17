var db = require('../db'),
    models = require('../models');
var School = models.School;

module.exports.list = function(req, res){
  School.find(function(e, schools) {
    res.render('schools_list', { title: "Schools", models: schools });
  });
};

module.exports.show = function(req, res) {
}

module.exports.create = function(req, res) {
}

module.exports.update = function(req, res) {
}

module.exports.destroy = function(req, res) {
}

