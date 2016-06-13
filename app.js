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

var app = express();

//db
mongoose.connect('mongodb://localhost/meanstackwalkthrough');
var User = require('./model/user');
var Product = require('./model/product');

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

// app.get('/products/:name', function(req, res){
//   var name = req.params.name;
//   Product.findOne({name: 'macbook'}, function(err, obj){
//     if (err) console.log('cant find object');
//     else console.log(obj);
//     res.send(obj);
//   })
//   //for more documentation see https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
//   // // get a user with ID of 1
//   // User.findById(1, function(err, user) {
//   //   if (err) throw err;
//   //
//   //   // show the one user
//   //   console.log(user);
//   // });
// })

app.get('/products/:id', function(req, res){
  // for more documentation see https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  // get a user with ID of 1
  console.log(req.params.id)
  Product.findOne({"_id": req.params.id}, function(err, user) {
    if (err) throw err;
    // show the one user
    console.log(user);
    res.send(user);
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

app.get('/products', function(req, res) {
  Product.find({}, function(err, products){
    res.send(products);
  })
});



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
