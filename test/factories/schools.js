var faker = require('Faker'),
    db = require('../../db'),
    School = require('../../models').School;

function createSchool(user, reviews) {
  var s = new School();
  if(user) s.user = user.id;
  if(reviews && reviews.length) s.reviews = reviews.map(function(e) { return e.id });
  s.name = faker.Company.companyName();
  s.chineseName = "中文名字";
  s.companyNumber = Math.floor(Math.random() * 1000000000);
  s.street = faker.Address.streetAddress();
  s.city = faker.Address.city();
  s.zip = faker.Address.zipCode();
  s.country = faker.random.array_element(["China", "Korea", "Thailand", "Japan"]);
  s.description = faker.Lorem.paragraph();
  return s;
}

module.exports = createSchool;
