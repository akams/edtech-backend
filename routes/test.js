var express     = require('express');
var router      = express.Router();
var testCtrl   = require('../controllers/testCtrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("okok");
});
router.get('/api', function(req, res, next) {
  res.send("API is working properly");
});
router.get('/db', testCtrl.pingDb);

module.exports = router;
