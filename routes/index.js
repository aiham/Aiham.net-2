var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/tech/:tech', function(req, res) {
  res.render('index');
});

module.exports = router;
