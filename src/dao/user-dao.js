var daoUtil = require('./dao-util');

var sql = {
    findUserByAccount: 'select * from user where account = ?'
}

module.exports = {
    findUserByAccount: function (account) {
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
};