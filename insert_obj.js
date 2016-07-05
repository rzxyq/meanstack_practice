//----without using a schema
var mongoose = require('mongoose');
var Admin = require('./model/admin');
var Product = require('./model/product');

var a = new Admin();
a.name = "admin2";
a.users.push('5755cb0b815d473d09f3aaa3');
a.save();

var b = new Product();
b.name="ipod";
b.price="1000";
b.save();

var c = new Product();
c.name="macbook pro";
c.price="2000";
c.save();
