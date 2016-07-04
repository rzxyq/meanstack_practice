var express = require('express');
var router = express.Router();
var User = require('../model/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('youve reached user page');
});


router.post('/', function(req, res){
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

router.delete('/:name', function(req,res){
  var name = req.params.name;
})

//login
router.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username }),
      req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

module.exports = router;
