var faker = require('Faker'),
    db = require('../../db'),
    Review = require('../../models').Review;

function createReview() {
  var r = new Review();
  r.userName = faker.Name.findName();
  r.rating = faker.random.number(5);
  r.pros = faker.Lorem.paragraph();
  r.cons = faker.Lorem.paragraph();
  r.jobStatus = faker.random.array_element(["current", "former"]);
  r.jobCity = faker.random.array_element(["Beijing", "Shanghai", "Guangzhou", "Kunming", "Shenzhen", "Hangzhou", "Suzhou", "Changsha", "Xi'an"]);
  r.lengthOfEmployment = faker.random.number(4);
  return r;
}

module.exports = createReview;