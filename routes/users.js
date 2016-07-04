var express = require('express');
var router = express.Router();
var User = require('../model/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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

router.delete('/users/:name', function(req,res){
  var name = req.params.name;
})

module.exports = router;
