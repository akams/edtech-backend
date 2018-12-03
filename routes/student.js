var express       = require('express');
var router        = express.Router();
var studentCtrl   = require('../controllers/studentCtrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register/', studentCtrl.register);
// router.post('/login/', usersCtrl.login);
// router.get('/logout/', usersCtrl.logout);
// router.get('/me/from/token', usersCtrl.getUserCredentials);

module.exports = router;
