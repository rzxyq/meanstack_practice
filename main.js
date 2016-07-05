// https://www.youtube.com/watch?v=twav6O53zIQ

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
var passportlocal = require('passport-local');
var passporthttp = require('passport-http');
var passportfacebook = require('passport-facebook');
var session = require('express-session');

//db
// var uristring =
//     process.env.MONGODB_URI ||
//     'mongodb://104.154.252.194:27017/mydb';
var User = require('./model/user');
mongoose.connect(config.mongoURI[process.env.NODE_ENV] || 'mongodb://localhost:27017/meanstackwalkthrough', function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});
// require('./insert_obj');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//cookies and sessions
app.use(cookieParser());
app.use(session({
  secret: 'mysecretkey',
  saveUninitialized: true,
  resave: true
}))

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//passport
passport.use(new passportlocal.Strategy(verifyCredentials));
passport.use(new passporthttp.BasicStrategy(verifyCredentials));
function verifyCredentials(username, password, done){
  if (username === password) {
    done(null, { id:'123sdkjh', name:username, password:password });
  } else {
    done(null, null);
  }
};
passport.use(new passportfacebook.Strategy({
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({ fbid: profile.id }, function (err, user) {
          if (err)
            return done(err);
          if (user) {
            console.log("user has data:" + user);
            return done(null, user);
          }
          else {
            var newUser = new User();
            newUser.username = 'myusername';
            newUser.password = 'asdfgh';
            newUser.fbid = profile.id;
            newUser.fbtoken = accessToken;
            newUser.fbname = profile.name.givenName + ' ' + profile.name.familyName;
            // newUser.email = profile.emails[0].value;
            newUser.save(function(err){
              console.log("newuser has data:" + newUser);
              if(err)
                  throw err;
              return done(null, newUser);
            });
          }
        });
      }); //process nexttick
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
})
passport.deserializeUser(function(id, done){
  done(null, {id:id, name:id});
})
app.use('/products', passport.authenticate('basic', {session: false}));

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()){
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }

//routes---------------------------------------------------------------
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
app.use('/', routes);
app.use('/users', users);
app.use('/admins', admins);
app.use('/products', products);

app.get('/account', function(req,res) {
  console.log(req.user);
  res.render('account', {
    title: 'Login',
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
})
app.get('/login', function(req,res) {
  res.render('login', { title: 'Express' });
})
app.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/account');
})

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
})

//facebook
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });


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
