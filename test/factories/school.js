var faker = require('Faker'),
    models = require('../models')
    db = require('../db');
var School = models.School;

function createSchool(cb) {
  var s = new School();
  s.name = faker.Company.companyName();
  s.chineseName = "中文名字";
  s.companyNumber = Math.floor(Math.random() * 1000000000);
  s.description = faker.Lorem.paragraph();

  s.save(function(e) {
    if(e)
      console.log(e);
    else
      console.log('School created [%s]', s.name);  
    cb(e);
  });

  return s;
}

module.exports = s;

