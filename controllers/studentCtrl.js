// Imports
var bcrypt                = require('bcrypt');
var asyncLib              = require('async');
var jwtUtils              = require('../utils/jwt.utils');
var StudentModel          = require('../models/student');
var createId              = require('../database/mongodb').createIdMongo;
var handleRegisterStudent = require('./handleStudents/register');

module.exports = {
  register: handleRegisterStudent.register,
};