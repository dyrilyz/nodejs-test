var mysql = require('mysql');
var config = require('../commons/config');

var pool = mysql.createPool(config.mysqlConfig);

module.exports = {
    execute: function (callback) {
        pool.getConnection(function (error, conn) {
            if (error) {
                console.log(e > './log.log')
            } else {
                callback(conn)
            }
        })
    }
};