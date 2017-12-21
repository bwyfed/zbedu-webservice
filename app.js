var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');//session中间件
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
let menu = require('./routes/menu');
//数据库连接字符串
let dbUrl = 'mongodb://localhost/zbedu';
var app = express();

mongoose.connect(dbUrl,{useMongoClient: true});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'zbedu',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collections: 'sessions'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/menu', menu);
//注册用户
app.post('/user/register',(req, res)=>{
    let _user = req.body.user;
    res.set('Content-Type','text/plain');
    res.end('注册成功');
});
//用户登录
app.post('/user/login',(req, res)=>{
    let _user = req.body.user;
    res.set('Content-Type','text/plain');
    res.end('登录成功');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
