var express       = require('express');
var router        = express.Router();
var studentCtrl   = require('../controllers/studentCtrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register/', studentCtrl.register);
router.post('/login/', studentCtrl.login);
router.get('/logout/', studentCtrl.logout);
router.get('/me/from/token', studentCtrl.getUserCredentials);

module.exports = router;
