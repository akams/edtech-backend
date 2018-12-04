var handleRegisterStudent = require('./handleStudents/register');
var handleLoginStudent    = require('./handleStudents/login');

module.exports = {
  register: function(req, res, next) {
    return handleRegisterStudent.register(req, res);
  },
  login: function(req, res, next) {
    return handleLoginStudent.login(req, res);
  },
};