var express = require('express');
var router = express.Router();
var meta = require('./read1/read1');

router.get('/:Sn1', function(req, res){
  var param = req.params.Sn1;
  switch(param){
    case '1' :
      meta.read1('1');
      break;
    case '2' :
      break;
    case '3' :
      break;
  }
  
  res.end();
});

module.exports = router;
