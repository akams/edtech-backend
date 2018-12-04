var bcrypt        = require('bcrypt');
var asyncLib      = require('async');
var StudentModel  = require('../../models/student');
var jwtUtils      = require('../../utils/jwt.utils');

exports.login = function(request, response) {
  const errors = { error: [] };
  const params = createBody(request);
  const msgErrors = validatorData(params);
  if (msgErrors.length !== 0) {
    errors.error = msgErrors;
    return response.status(400).json(errors);
  }
  asyncLib.waterfall([
    function(done) {
      const { username, studentUid } = params;
      const request = { $and: [ 
        { username: username },
        { studentUid: studentUid } ]
      };
      StudentModel.find(request)
      .then(function(userFound) {
        done(null, userFound);
      })
      .catch(function(err) {
        return response.status(500).json({ 'error': 'unable to verify user' });
      });
    },
    function(userFound, done) {
      if (userFound) {
        const { password } = params;
        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
          done(null, userFound, resBycrypt);
        });
      } else {
        return response.status(404).json({ 'error': 'user not exist in DB' });
      }
    },
    function(userFound, resBycrypt, done) {
      if(resBycrypt) {
        done(userFound);
      } else {
        return response.status(403).json({ 'error': 'invalid password' });
      }
    }
  ], function(userFound) {
    if (userFound) {
      return response.status(201).json({
        'token': jwtUtils.generateTokenForUser(userFound)
      });
    } else {
      return response.status(500).json({ 'error': 'cannot log on user' });
    }
  });
}

function createBody(req) {
  return {
    password: req.body.password,
    username: req.body.username,
    studentUid: req.body.studentUid,
  }
}

function validatorData(params) {
  console.log({params});
  const msgErrors = [];
  if (!params.username === true|| !params.password === true || !params.studentUid === true) {
    msgErrors.push('missing parameters');
  }
  return msgErrors;
}
