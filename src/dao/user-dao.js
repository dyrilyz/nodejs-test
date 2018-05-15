var daoUtil = require('./dao-util');

module.exports = {
    findUserByAccount: findUserByAccount,       // 按账号查询
    appendUser: appendUser                      // 新增用户
};

var sql = {
    findUserByAccount: 'select * from user where account = ?',
    appendUser: 'insert into user (account, username, password) values (?, ?, ?)'
}

function findUserByAccount(account) {
    return new Promise(function (resolve, reject) {
        daoUtil.execute(function (conn) {
            conn.query({
                sql: sql.findUserByAccount,
                values: [account]
            }, function (e, result, fields) {
                if (e) {
                    console.log(e > './log.log')
                }
                if (result && result.length > 0) {
                    resolve(result[0])
                } else {
                    reject('用户不存在');
                }
            });
            conn.release()
        });
    })
}

function appendUser(user) {
    return new Promise(function (resolve, reject) {
        daoUtil.execute(function (conn) {
            conn.query({
                sql: sql.appendUser,
                values: [user.account, user.username, user.password]
            }, function (e, result, fields) {
                if (e) {
                    console.log(e > './log.log')
                }
                if (result) {
                    resolve();
                } else {
                    reject();
                }
            })
        })
    });
}
