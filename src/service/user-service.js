var userDao = require('../dao/user-dao');
var md5 = require('md5');

module.exports = {
    checkAccount: checkAccount,  // 检查账号是否存在
    checkLogin: checkLogin,      // 检查账号或密码是否正确
    getUser: getUser,            // 获取用户
    appendUser: appendUser       // 新增用户
};

function checkAccount(account) {
    return new Promise(function (resolve, reject) {
        userDao.findUserByAccount(account).then(
            // 用户存在时
            function () {
                reject();
            },
            function () {
                // 用户不存在时
                resolve();
            });
    });
}

function checkLogin(account, password) {
    return new Promise(function (resolve, reject) {
        getUser(account).then(
            function (user) {
                if (md5(password) == user.password) {
                    resolve();
                } else {
                    reject();
                }
            }, function () {
                reject();
            });
    })
}

function getUser(account) {
    return new Promise(function (resolve, reject) {
        userDao.findUserByAccount(account).then(
            function (user) {
                resolve(user);
            },
            function (eMsg) {
                reject(eMsg);
            });
    })
}

function appendUser(user) {
    return new Promise(function (resolve, reject) {
        if (user) {
            user.username = '用户' + Math.round(Math.random() * 10000000);
            user.password = md5(user.password);
        }
        userDao.appendUser(user).then(
            function () {
                resolve();
            }, function () {
                reject();
            }
        );
    })

}