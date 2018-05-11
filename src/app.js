var express = require('express');
var path = require('path')
var serverConfig = require('./commons/config');
//导入模块路由
var account = require('./controller/account-controller');
var app = express();

//处理静态资源
app.use(express.static(path.join(__dirname, 'view')));

app.use('/account', account);

app.listen(serverConfig.port);