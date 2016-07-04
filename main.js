var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var admins = require('./routes/admins');
var config = require('./config');
var app = express();
//vars
var testMode = false;
//passport
var passport = require('passport');
var session = require('express-session');

//db
// var uristring =
//     process.env.MONGODB_URI ||
//     'mongodb://104.154.252.194:27017/mydb';
mongoose.connect(config.mongoURI[process.env.NODE_ENV] || 'mongodb://localhost:27017/mydb', function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(function(req,res) {
//   var data = '<h1>hello</h1>';
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end(data);
// })
// app.use(function(req,res, next){
//   if (req.url == '/test') {
//     console.log('enabling test mode');
//     testMode = true;
//   }
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'mysecretkey',
  saveUninitialized: true,
  resave: true
}))
app.use('/', routes);
app.use('/users', users);
app.use('/admins', admins);
app.use('/products', products);



//-------error----------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
