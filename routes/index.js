exports.index = function(req, res){
  res.render('index', { title: 'TEFL Ratings' });
};

module.exports.schools = require('./schools');
