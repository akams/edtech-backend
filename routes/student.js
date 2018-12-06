var express       = require('express');
var router        = express.Router();
var studentCtrl   = require('../controllers/studentCtrl');
var jwtUtils      = require('../utils/jwt.utils');

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next();

  var studentUID = jwtUtils.getStudentId(token);
  if (studentUID === -1) {
    return res.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  } 
  else {
    req.studentUID = studentUID;
    next();
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register/', studentCtrl.register);
router.post('/login/', studentCtrl.login);
router.get('/logout/', studentCtrl.logout);
router.get('/me/from/token', studentCtrl.getUserCredentials);

module.exports = router;
