var express = require('express');
var router = express.Router();
var meta = require('./read1/read1');
var contents = {};

router.get('/', function(req, res){
  console.log("in");  
  console.log(meta.read1('1'));
  console.log("out");
});

module.exports = router;
