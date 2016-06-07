//----without using a schema
var mongoose = require('mongoose');
var Product = mongoose.model('Product', {name: String});
// var product = new Product({name: "macbook"});
// product.save(function(err) {
//   console.log('Product saved');
// }
module.exports = Product;
