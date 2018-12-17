var express       = require('express');
var router        = express.Router();
var multer        = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/teacher/')
  },
  filename: function (req, file, cb) {
    console.log('storage' , file)
    cb(null, Date.now()+ file.originalname)
  }
});
var upload = multer({ storage: storage})


var teacherCtrl   = require('../controllers/teacherCtrl');
var jwtUtils      = require('../utils/jwt.utils');

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next();

  var teacherUUID = jwtUtils.getTeacherId(token);
  if (teacherUUID === -1) {
    return res.status(401).json({
      success: false,
      message: 'Please register Log in'
    });
  } 
  else {
    req.teacherUUID = teacherUUID;
    next();
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register/', teacherCtrl.register);
router.post('/login/', teacherCtrl.login);
router.get('/me/from/token', teacherCtrl.getUserCredentials);
router.get('/logout/', teacherCtrl.logout);
router.post('/upload-file/', upload.any(), teacherCtrl.uploadFile);

module.exports = router;
