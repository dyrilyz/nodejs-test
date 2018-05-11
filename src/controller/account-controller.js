var express = require('express');
var router = express.Router();

router
    .get('/register', function (req, resp) {
        resp.send('注册成功');
    })
    .get('/login', function (req, resp) {
        resp.send('登录成功');
    });

module.exports = router;