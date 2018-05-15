var express = require('express');
var userService = require('../service/user-service');
var router = express.Router();

router
// TODO 注册接口
    .post('/register', function (req, resp) {
        var flag = userService.accountIsExist(123);
        // flag = false;
        if (flag) {
            resp.send({status: true, msg: '注册成功'});
        } else {
            resp.send({status: false, msg: '该账号已存在'});
        }
    })
    // 登录接口
    .post('/login', function (req, resp) {
        if (!req.body.account || !req.body.password) {
            resp.json({status: false, msg: '账户或密码为空'});
            return;
        }
        userService.checkLogin(req.body.account, req.body.password).then(
            function () {
                userService.getUser(req.body.account).then(
                    function (user) {
                        req.session.user = user;
                        resp.json({status: true, msg: '登录成功', user: user});
                    },
                    function (eMsg) {
                        resp.json({status: false, msg: eMsg});
                    }
                );
            },
            function () {
                resp.json({status: false, msg: '账户或密码不正确'});
            }
        )
    });

module.exports = router;