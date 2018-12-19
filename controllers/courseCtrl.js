var handleCourses   = require('./handleCourses/post');

module.exports = {
  // Upload file
  uploadFile: function(req, res, next) {
    // req.files is array of `photos` files
    console.log('req.====>>', req.query);
    if (req.files) { 
      return res.end('Success upload.');
    }
    return res.end('Missing file.'); 
  },
  // course
  postCourse: function(req, res, next) {
    return handleCourses.post(req, res);
  },
};