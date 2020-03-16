var express = require('express');
var http = require('http');
var path = require('path')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//express 서버 포트 설정(cafe24 호스팅 서버는 8001 포트 사용)
app.set('port', process.env.PORT || 8001);
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

/*
2020-03-06 몽고디비 커넥션 에러가 난다. 차후에 확인하고 mysql로 변경한다.
var mongoose = require('mongoose');
//auto-increment를 위한 패키지
var autoIncrement = require('mongoose-auto-increment');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("mongo db Connection");
});
var connect = mongoose.connect('mongodb://127.0.0.1:27017/myDbName', { useMongoClient: true });
autoIncrement.initialize(connect);
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/common',express.static(path.join(__dirname + '/public')));  //정적인 경로를 사용할 때

//app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*=======================================================================*/
/*
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.minute = 3; //3분마다 실행
var sc = schedule.scheduleJob(rule, function(){
  console.log("3분마다 실행");
});
*/

app.get('/', function(req, res){
  res.redirect('/main');
});
//routes add

var main = require('./routes/main/main');
app.use('/main', main);
var lazyholder = require('./routes/lazyholder/lazyholder');
app.use('/lazyholder', lazyholder);
