var jwtUtils      = require('../../utils/jwt.utils');
var StudentModel  = require('../../models/student');

exports.getUserCredentials = async function(req, response) {
  console.log('start get user credentials');
  const studentUID = req.studentUID;
  if (!studentUID) {
    return response.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  }
  return StudentModel.find({ studentUid: studentUID })
    .then(function(userFound) {
      console.log('success get user credentials');
      const safeData = Object.assign({}, userFound);
      safeData.isStudent = true;
      return response.status(201).json({
        'token': jwtUtils.generateTokenForUser(safeData)
      });
    })
    .catch(function(err) {
      console.log({err});
      return response.status(500).json({ 'error': 'unable to verify user' });
    });
};