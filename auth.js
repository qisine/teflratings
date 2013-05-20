var everyauth = require('everyauth')
    , bcrypt = require('bcrypt')
    , mongoose = require('./db')
    , models = require('./models')
    , auth = {};
var User = models.User;

everyauth
  .password
  .loginWith('email')
  .getLoginPath('/login')
  .postLoginPath('/login')
  //.loginView('<div></div>')
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
  //.registerView('<div></div>')
  .validateRegistration(function(newUserAttrs) {
    var promise = this.Promise()
        , email = newUserAttrs.email;
    User.findOne({ email: email }, function(err, user) {
      if(err)
        return promise.fail(new Error(err));
      else if(user)
        return promise.fail(new Error("Email already registered"));
      else
        return promise.fulfill(user);
    });

    return promise;
  })
  .registerUser(function(newUserAttrs) {
    var promise = this.Promise(),
        passwd = newUserAttrs.password;

    delete newUserAttrs.password;
    newUserAttrs.salt = bcrypt.genSaltSync(10);
    newUserAttrs.hash = bcrypt.hashSync(passwd, newUserAttrs.salt);

    User.create(newUserAttrs, function(err, user) {
      if(err) return promise.fail(new Error(err));
      return promise.fulfill(user);
    });

    return promise;
  })
  .registerSuccessRedirect('/');

everyauth.everymodule.findUserById(function(userId, cb) {
  User.findById(userId, cb);
});

auth.everyauth = everyauth;

auth.authenticate = function(req, res, next) {
  if(!req.user) res.send(401, { error: "Must login to access this resouce"});
  else next();
}

auth.authorize = function(resource) {
  return function(req, res, next) {
    console.log('params->', req.params);
    resource.findById(req.params.id, function(err, resourceInst) {
      console.log('ri.user [%s], req.usr.id [%s]', resourceInst.user, req.user.id);
      if(err) next(err);
      else if(!req.user) res.send(401, { error: "Must login to access this resource" });
      else if(!resourceInst.user.equals(req.user.id)) res.send(401, { error: "Not authorized to access this resource"});
      else next();
    });
  }
}

auth.authenticateAndAuthorize = function(resource) {
  return [auth.authenticate, auth.authorize(models[resource])];
}

module.exports = auth;
