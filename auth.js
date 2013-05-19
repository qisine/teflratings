var everyauth = require('everyauth');

everyauth
  .password
  .getLoginPath('/signin')
  .postLoginPath('/signin')
  .loginView('<div></div>')
  .authenticate(function(login, password) {

  })
  .loginSuccessRedirect('/')
  .getRegisterPath('/register')
  .postRegisterPath('/register')
  .validateRegistration(function(newUserAttrs) {

  })
  .registerUser(function(newUserAttrs) {

  })
  .registerSuccessRedirect('/');

module.exports = everyauth;
