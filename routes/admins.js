var express = require('express');
var router = express.Router();
var Admin = require('../model/admin');
var User = require('../model/user');


router.get('/', function(req, res){
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

router.get('/:userid', function(req, res){
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

module.exports = router;
