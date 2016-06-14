/**
 * Created by ruoyanqin on 6/6/16.
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create a schema
var adminSchema = new Schema({
    name: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

// the schema is useless so far
// we need to create a model using it
var Admin = mongoose.model('Admin', adminSchema);

// make this available to our users in our Node applications
module.exports = Admin;

