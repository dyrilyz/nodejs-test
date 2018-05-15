/**
 * 登录拦截器
 */
var viewReg = /.html$/
module.exports = function (excludeUrls) {
    return function (req, resp, next) {
        if (req.session.user) {
            next();
        } else {
            var flag = false;
            for (var i in excludeUrls) {
                if (excludeUrls[i] == req.url) {
                    flag = true;
                    break;
                }
            }
            if (flag) {
                next();
                // 页面拦截
            } else if (viewReg.test(req.url)) {
                resp.redirect('/view/login.html');
                // 接口拦截
            } else {
                resp.send({status: false, msg: '请登录'});
            }
        }
    }
}