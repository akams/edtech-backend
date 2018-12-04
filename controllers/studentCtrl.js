var handleRegisterStudent         = require('./handleStudents/register');
var handleLoginStudent            = require('./handleStudents/login');
var handleLogoutStudent           = require('./handleStudents/logout');
var handleCredentialStudent       = require('./handleStudents/getCredentialStudent');

module.exports = {
  register: function(req, res, next) {
    return handleRegisterStudent.register(req, res);
  },
  login: function(req, res, next) {
    return handleLoginStudent.login(req, res);
  },
  getUserCredentials: function(req, res, next) {
    return handleCredentialStudent.getUserCredentials(req, res);
  },
  logout: function(req, res, next) {
    return handleLogoutStudent.logout(req, res);
  }
};