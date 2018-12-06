var handleRegisterTeacher         = require('./handleTeachers/register');
var handleLoginTeacher            = require('./handleTeachers/login');
var handleLogoutTeacher           = require('./handleTeachers/logout');
var handleCredentialTeacher       = require('./handleTeachers/getCredentialTeacher');

module.exports = {
  register: function(req, res, next) {
    return handleRegisterTeacher.register(req, res);
  },
  login: function(req, res, next) {
    return handleLoginTeacher.login(req, res);
  },
  getUserCredentials: function(req, res, next) {
    return handleCredentialTeacher.getUserCredentials(req, res);
  },
  logout: function(req, res, next) {
    return handleLogoutTeacher.logout(req, res);
  }
};