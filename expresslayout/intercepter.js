var express = require('express');
var router = express.Router();
var login = require('./routes/main/login');

router.get('/', function(req, res, next) {
    app.use('/', main);
    next();
});

module.exports = router;