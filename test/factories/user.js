var faker = require('Faker'),
    bcrypt = require('bcrypt'),
    db = require('../../db'),
    User = require('../../models').User;

function createUser(schools, reviews) {
  var u = new User();
  if(schools && schools.length) u.schools = schools.map(function(e) { return e.id });
  if(reviews && reviews.length) u.reviews = reviews.map(function(e) { return e.id });
  u.name = faker.Name.findName();
  u.salt = bcrypt.genSaltSync(10);
  u.hash = bcrypt.hashSync('foobar', u.salt);
  return u;
}

module.exports = createUser;
