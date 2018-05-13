var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var serverConfig = require('./commons/config');
//导入模块路由
var account = require('./controller/account-controller');
var app = express();

app.use(session({
    secret: 'zhxazr',
    // resave 为强制将session存入store中
    resave: true,
    // saveUninitialized为强制将未初始化的session存入store中，这里选择false
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 1000 * 60 * 30}
}));
// 解析post请求时所传参数
app.use(bodyParser.json());

//处理静态资源
app.use(express.static(path.join(__dirname, 'view')));

app.use('/account', account);

app.listen(serverConfig.port);