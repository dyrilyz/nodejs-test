var express = require('express');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var serverConfig = require('./commons/config');
var loginFilter = require('./filter/login-filter');
var excludeUrl = require('./commons/exclude-url')
//导入模块路由
var userCtrl = require('./controller/user-controller');

// 创建应用
var app = express();

// 使用session中间件
app.use(session({
    secret: 'zhxazr',
    // resave 为强制将session存入store中
    resave: true,
    // saveUninitialized为强制将未初始化的session存入store中，这里选择false
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 1000 * 60 * 30}
}));

// 添加登录拦截
app.use('/', loginFilter(excludeUrl));

// 解析post请求时所传参数
app.use(bodyParser.json());

//处理静态资源
app.use(serverConfig.appConfig.viewPrefix, express.static(path.join(__dirname, 'view')));

// 用户操作--路由
app.use(serverConfig.appConfig.ifcPrefix + '/user', userCtrl);

app.listen(serverConfig.appConfig.port);

console.log('server is started.\nlisten port: ' + serverConfig.appConfig.port);