var jwtUtils      = require('../../utils/jwt.utils');
var CourseModel  = require('../../models/course');

exports.post = async function(req, response) {
  console.log('start post course');
  const teacherUUID = req.teacherUUID;
  if (!teacherUUID) {
    return response.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  }
  const body = req.body;
  const data = {
    ...body,
  };
  console.log('req', body);
  CourseModel.insert(data)
    .then(function(course) {
      console.log('success create ==>', course.result);
      return response.json({
        'userId': course.insertedId
      });
    })
    .catch(function(err) {
      return response.status(500).json({ 'error': 'cannot add course' });
    });
};