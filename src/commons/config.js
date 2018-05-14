module.exports = {
    appConfig: {
        port: 8080,
        ifcPrefix: '/ifc',
        viewPrefix: '/view'
    },
    mysqlConfig: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'forum'
        // ,debug: ['ComQueryPacket', 'RowDataPacket']  //开启调试模式
    }
};
