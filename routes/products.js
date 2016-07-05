var express = require('express');
var router = express.Router();
var Product = require('../model/product');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        next();
    } else {
        // res.redirect('/login');
        res.send(403);
    }
}


router.get('/:id', function(req, res){
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

router.put('/:id', function(req, res){
    // for more documentation see https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
    // get a user with ID of 1
    Product.findOne({"_id": req.params.id}, function(err, user) {
        if (err) throw err;
        user.name = req.body.name;
        console.log(user);
        res.send({UPDATED: user});
    });
})


//this uses cookies, api should use headers instead of cookies
router.get('/', ensureAuthenticated, function(req, res) {
    Product.find({}, function(err, products){
        res.send(products);
    })
});
router.post('/', function(req, res) {
    var name = req.body.name;
    var b = new Product();
    b.name=name;
    b.save(function(){
        res.send({
            SUCCESS: {
                name: name
            }
        });
    });
});

module.exports = router;
