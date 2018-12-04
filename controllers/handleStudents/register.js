// Imports
var bcrypt        = require('bcrypt');
var asyncLib      = require('async');
var uuidv4        = require('uuid/v4');
var CONSTANT      = require('../../config/constant');
var StudentModel  = require('../../models/student');

exports.register = function(req, response) {
  console.log('start register');
  const errors = { error: [] };
  const params = createBody(req);
  console.log('extract params ==>', params);
  const msgErrors = validatorData(params, errors);
  if (msgErrors.length !== 0) {
    errors.error = msgErrors;
    return response.status(400).json(errors);
  }
  asyncLib.waterfall([
    function(done) {
      console.log('request user ==>', params);
      const { email, username } = params;
      const request = { $or: [
        { email: email },
        { username: username }] 
      };
      StudentModel.find(request)
        .then(function(userFound) {
          console.log('user found ==>', userFound);
          done(null, userFound);
        })
        .catch(function(err) {
          return response.status(500).json({ 'error': 'unable to verify user' });
        });
    },
    function(userFound, done) {
      if (!userFound) {
        console.log('create pass ==>');
        const { password } = params;
        bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
          console.log('create pass ==> success');
          done(null, userFound, bcryptedPassword);
        });
      } else {
        return response.status(409).json({ 'error': 'user already exist' });
      }
    },
    function(userFound, bcryptedPassword, done) {
      console.log('start insert data');
      const cloneParams = Object.assign({}, params);
      delete cloneParams.password;
      cloneParams.billing.status = "IN_PROGRESS";
      cloneParams.studentUid = uuidv4();
      const data = {
        ...cloneParams,
        password: bcryptedPassword,
        isAdmin: 0
      }
      console.log('data ==> ', cloneParams);
      StudentModel.insert(data)
      .then(function(newUser) {
        console.log('success create ==>', newUser.result);
        done(newUser);
      })
      .catch(function(err) {
        return response.status(500).json({ 'error': 'cannot add user' });
      });
    }
  ], function(newUser) {
    if (newUser) {
      console.log('success register ==>', newUser.insertedId);
      return response.json({
        'userId': newUser.result
      });
    } else {
      return response.status(500).json({ 'error': 'cannot add user' });
    }
  });
}

/**
 * return good params
 * @param {*} req 
 */
function createBody(req) {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username,
    birthDate: req.body.birthDate,
    email: req.body.email,
    geoloc: {
      country: req.body.country,
      city: req.body.city || '',
      cp: req.body.cp || '',
      address: req.body.address || '',
    },
    billing: {
      type: req.body.type,
    },
    subscribeYear: {
      degree: req.body.degree,
      promoYear: req.body.promoYear,
    },
  }
}

/**
 * Valide format data
 * @param {*} params 
 */
function validatorData(params) {
  const msgErrors = [];
  if (params.firstName.length >= 15 || params.firstName.length <= 1) {
    msgErrors.push('wrong firstname (must be length 5 - 12)');
  }
  if (params.lastName.length >= 15 || params.lastName.length <= 1) {
    msgErrors.push('wrong lastname (must be length 5 - 12)');
  }
  if (params.username.length >= 13 || params.username.length <= 4) {
    msgErrors.push('wrong username (must be length 5 - 12)');
  }
  
  if (!CONSTANT.EMAIL_REGEX.test(params.email)) {
    msgErrors.push('email is not valid');
  }

  if (!CONSTANT.PASSWORD_REGEX.test(params.password)) {
    msgErrors.push('password invalid (must length 4 - 8 and include 1 number at least)');
  }
  return msgErrors;
}
