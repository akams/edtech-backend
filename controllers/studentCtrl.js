
var jwtUtils              = require('../utils/jwt.utils');
var createId              = require('../database/mongodb').createIdMongo;
var handleRegisterStudent = require('./handleStudents/register');

module.exports = {
  register: function(req, res, next) {
    return handleRegisterStudent.register(req, res);
  },
};