var userDao = require('../dao/user-dao');
var md5 = require('md5');

module.exports = {
    // TODO 检查账号是否存在
    checkAccount: function (account) {
        return true;
    },
    checkLogin: checkLogin,     // 检查账号或密码是否正确
    getUser: getUser            // 获取用户service
};

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