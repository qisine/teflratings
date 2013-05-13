  var a= new Address();
  a.street = faker.Address.streetAddress;
  a.city = faker.Address.city;
  a.zip = faker.Address.zipCode;
  a.country = Faker.random.array_element(["China", "Korea", "Thailand", "Japan"]);


