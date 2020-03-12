var express = require('express');
var router = express.Router();
var meta = require('./read1/read1');
var contents = {};

router.get('/', function(req, res){
  meta.read1('1');
});

module.exports = router;
