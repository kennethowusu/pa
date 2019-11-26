

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');
var withdrawRouter   = require('./routes/withdraw')
var summaryRouter   = require('./routes/summary');
var confirmRouter = require('./routes/confirm')
var investmentRouter = require('./routes/investment')
var referralRouter  = require('./routes/referral');
var notificationRouter = require('./routes/notification')
var settingsRouter  = require('./routes/settings')
var app = express();

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

//================Dot env=======================//
require('dotenv').config();


var options = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    clearExpired: true
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account',accountRouter);
app.use('/account/withdraw',withdrawRouter)
app.use('/account/summary',summaryRouter)
app.use('/account/confirmation',confirmRouter)
app.use('/account/investment',investmentRouter)
app.use('/account/settings',settingsRouter)
app.use('/account/referral',referralRouter)
app.use('/account/notifications',notificationRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
