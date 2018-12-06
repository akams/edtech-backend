var jwtUtils      = require('../../utils/jwt.utils');
var TeacherModel  = require('../../models/teacher');

exports.getUserCredentials = async function(req, response) {
  console.log('start get user credentials');
  const teacherUUID = req.teacherUUID;
  if (!teacherUUID) {
    return response.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  }
  return TeacherModel.find({ teacherUUID: teacherUUID })
    .then(function(userFound) {
      console.log('success get user credentials');
      const safeData = Object.assign({}, userFound);
      safeData.isTeacher = true;
      return response.status(201).json({
        'token': jwtUtils.generateTokenForUser(safeData)
      });
    })
    .catch(function(err) {
      console.log({err});
      return response.status(500).json({ 'error': 'unable to verify user' });
    });
};