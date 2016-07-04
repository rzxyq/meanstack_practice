var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");
var testMode = false;

var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var config = require('./config');

var app = express();

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
var User = require('./model/user');
var Product = require('./model/product');
var Admin = require('./model/admin');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', routes);
app.use('/users', users);
app.use('/products', products);

app.use(function(req,res, next){
  if (req.url == '/test') {
    console.log('enabling test mode');
    testMode = true;
  }
  next();
});
//
// app.get('/', function(req, res) {
//   res.render('index', { title: 'Expressssss' });
// });

app.get('/admin/', function(req, res){
  // for more documentation see https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  // get a user with ID of 1
  console.log(req.params.id)
  Admin.findById('575f0eb913bbeff7095e4474', function(err,admin) {
    if (err) throw err;
    // show the one user
    console.log(admin);
    User.findById(admin.users[0], function(err, user){console.log(user)});
    res.send(admin);
  });
})

app.get('/admins/:userid', function(req, res){
  // for more documentation see https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  // get a user with ID of 1
  console.log(req.params.userid)
  console.log(typeof req.params.userid)
  //other test value is "_id" : 575624d9afc507ea0a127a96, should be admin1 instead of 2

  Admin.findOne({users:[req.params.userid]}, function(err,admin) {
    if (err) throw err;
    // show the one user
    console.log(admin);
    res.send(admin);
  });
})

app.post('/users', function(req, res){
  var name = req.body.name;
  console.log(name);
  if (!name) {
    res.send({ success:false, reason: 'cannot create empty user'});
    return;
  }
  User.find({name: name}, function(err, existingUser){
    if (existingUser.length==0) { //find out why error isnt woking
      var chris = new User({
        name: 'amyn',
        username: 'ch23',
        password: '123456'
      })
      chris.dudify(function(err, name){
        if (err) throw err;
        console.log('Your new name is' + name);
      });
      chris.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully!');
      });
      res.send({success: true, message:'successfully saved new user'});
    } else {
      res.send({ success:false, reason: 'user already exists'});
    }
  });
})

app.delete('/users/:name', function(req,res){
  var name = req.params.name;
})




app.get('/hello', function(req, res) {
  res.send('<h1>hello world</h1>');
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
