//----without using a schema
var mongoose = require('mongoose');
var Admin = require('./model/admin');

var a = new Admin()
a.name = "admin2";
a.users.push('5755cb0b815d473d09f3aaa3');
a.save();
