var express = require('express');
var accountService = require('../service/account-service');
var router = express.Router();

router
    .post('/register', function (req, resp) {
        var flag = accountService.accountIsExist(123);
        // flag = false;
        if (flag) {
            resp.send({status: true, msg: '注册成功'});
        } else {
            resp.send({status: false, msg: '该账号已存在'});
        }
    })
    .post('/login', function (req, resp) {
        console.log(req.body.password)
        if (!req.body.account || !req.body.password) {
            resp.json({status: false, msg: '账户或密码为空'})
        } else if (!accountService.checkAccount()) {
            resp.json({status: false, msg: '账户不存在'})
        } else if (!accountService.checkPassword()) {
            resp.json({status: false, msg: '密码不正确'})
        } else {
            var user = accountService.getUser();
            req.session.user = user;
            resp.json({status: true, msg: '登录成功', user: user});
        }
    });

module.exports = router;