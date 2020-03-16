const express = require('express');
const path = require('path');
const router = express.Router(); // 라우터 분리

router.get('/main', (req, res) => { // app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'main.html'));
});
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'about.html'));
});
/*
var main = require('./routes/main/main');
app.use('/main', main);
var lazyholder = require('./routes/lazyholder/lazyholder');
app.use('/lazyholder', lazyholder);
*/
module.exports = router; // 모듈로 만드는 부분