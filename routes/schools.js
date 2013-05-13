var db = require('../db'),
    models = require('../models');
var School = models.School;

module.exports.list = function(req, res){
  School.find(function(e, schools) {
    res.render('schools_list', { title: "Schools", models: schools });
  });
};

