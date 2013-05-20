var everyauth = require('everyauth')
    , bcrypt = require('bcrypt')
    , mongoose = require('./db')
    , User = require('./models').User;

everyauth
  .password
  .loginWith('email')
  .getLoginPath('/signin')
  .postLoginPath('/signin')
  .loginView('<div></div>')
  .authenticate(function(email, password) {
    var promise
      , errors = [];

    if(!email) errors.push("Email cannot be empty");
    if(!password) errors.push("Password cannot be empty");
    if(errors.length) return errors;

    promise = this.Promise();
    User.findOne({email: email}, function(err, user) {
      if(err)
        return promise.fail(new Error(err));
      else if(!user)
        return promise.fail(new Error("User with email [" + email + "] doesn't exist"));

      bcrypt.compare(password, user.hash, function(err, success) {
        if(err)
          return promise.fail(new Error(err));
        else if(!success)
          return promise.fail(new Error("Passwords do not match"));  

        return promise.fulfill(user);
      }); 
    });
    return promise;
  })
  .loginSuccessRedirect('/')
  .getRegisterPath('/register')
  .postRegisterPath('/register')
  .validateRegistration(function(newUserAttrs) {
  })
  .registerUser(function(newUserAttrs) {
    var promise = this.Promise(),
        passwd = newUserAttrs.password;

    delete newUserAttrs.password;
    newUserAttrs.salt = bcrypt.genSaltSync(10);
    newUserAttrs.hash = bcrypt.hashSync(passwd, salt);

    User.create(newUserAttrs, function(err, user) {
      if(err) return promise.fail(new Error(err));
      return promise.fulfill(user);
    });

    return promise;
  })
  .registerSuccessRedirect('/');

module.exports = everyauth;
