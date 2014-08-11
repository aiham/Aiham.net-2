var express = require('express');
var router = express.Router();

router.get('/socials', function(req, res) {
  res.json(require('../data/socials'));
});

router.get('/projects', function(req, res) {
  res.json(require('../data/projects'));
});

router.get('/codes', function(req, res) {
  res.json(require('../data/codes'));
});

module.exports = router;
