var jwtUtils      = require('../../utils/jwt.utils');
var TeacherModel  = require('../../models/teacher');

exports.logout = async function(request, response) {
  console.log('start to logout user');
  const teacherUUID = request.teacherUUID;
  if (!teacherUUID) {
    return response.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  }
  return TeacherModel.find({ teacherUUID: teacherUUID })
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