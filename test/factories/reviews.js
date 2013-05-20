var faker = require('Faker'),
    db = require('../../db'),
    Review = require('../../models').Review;

function createReview(user, school) {
  var r = new Review();
  if(user) r.user = user.id;
  if(school) r.school = school.id;
  r.rating = faker.random.number(5);
  r.pros = faker.Lorem.paragraph();
  r.cons = faker.Lorem.paragraph();
  r.jobStatus = faker.random.array_element(["current", "former"]);
  r.jobCity = faker.random.array_element(["Beijing", "Shanghai", "Guangzhou", "Kunming", "Shenzhen", "Hangzhou", "Suzhou", "Changsha", "Xi'an"]);
  r.lengthOfEmployment = faker.random.number(4);
  return r;
}

module.exports = createReview;
