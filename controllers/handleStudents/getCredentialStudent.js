var jwtUtils      = require('../../utils/jwt.utils');
var StudentModel  = require('../../models/student');

exports.getUserCredentials = async function(req, response) {
  console.log('start get user credentials');
  const studentUID = req.studentUID;
  return StudentModel.find({ studentUid: studentUID })
    .then(function(userFound) {
      console.log('success get user credentials');
      return response.status(201).json({
        'token': jwtUtils.generateTokenForUser(userFound)
      });
    })
    .catch(function(err) {
      console.log({err});
      return response.status(500).json({ 'error': 'unable to verify user' });
    });
};