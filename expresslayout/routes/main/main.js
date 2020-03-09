var express = require('express');
var router = express.Router();

var maindto = require('./mainDto/maindto');
var maindtoI = require('./mainDto/mainInsertdto');

router.get('/', function(req, res){
  /*
  res.render('main/main',{
    title : 'main page'
  });
  */
  maindto.list(req, res);

});

router.get('/insert', function(req, res){
  maindtoI.insert(req, res);
});


router.get('/insert/ajaxCheck', function(req, res){
  maindtoI.insertAjaxCheck(req, res);
});

router.post('/insert/ajax', function(req, res){
  console.log("inininin");
	var data = req.body.data;
	maindtoI.insertDB(data, req, res);
});

router.get('/detail/:s1/:s2', function(req, res){
  var type = req.params.s1;
  var seq = req.params.s2;
  var detail = maindto.detail();
  if(type == 'list'){
      detail.list(seq, req, res);
  }else{
      detail.view(seq, req, res);
  }
});

module.exports = router;
