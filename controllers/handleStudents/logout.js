var jwtUtils      = require('../../utils/jwt.utils');
var StudentModel  = require('../../models/student');

exports.logout = async function(request, response) {
  console.log('start to logout user');
  const studentUID = request.studentUID;
  return StudentModel.find({ studentUid: studentUID })
    .then(function() {
      console.log('generate expire token to logout user');
      return response.status(201).json({
        'token': jwtUtils.generateTokenForUser({}, {expiresIn: 1})
      });
    })
    .catch(function(err) {
      console.log({err});
      return response.status(500).json({ 'error': 'unable to verify user' });
    });
};