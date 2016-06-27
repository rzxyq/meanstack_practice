process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");
var server = require('../main');
var Product = require("../model/product");
var should = chai.should();
chai.use(chaiHttp);


describe('Products', function() {
    Product.collection.drop();
    beforeEach(function(done){
        var newBlob = new Product({
            name: 'pineapple'
        });
        newBlob.save(function(err) {
        });
        var newBlob2 = new Product({
            name: 'banana'
        });
        newBlob2.save(function(err) {
            done();
        });
    });
    afterEach(function(done){
        Product.collection.drop();
        done();
    });

    it('should list ALL products on /products/ GET', function(done) {
        chai.request(server)
            .get('/products/')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('pineapple');
                res.body[1].name.should.equal('banana');
                done();
            });
    });

    it('should list a SINPLE product on /products/ POST', function(done) {
        chai.request(server)
            .post('/products/')
            .send({'name': 'apple'})
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.name.should.equal('apple');
                done();
            });
    });

    it('should list a SINGLE blob on /products/<id> GET', function(done) {
        var newBlob = new Product({
            name: 'orange',
        });
        newBlob.save(function(err, data) {
            chai.request(server)
                .get('/products/'+data.id)
                .end(function(err, res){2
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.name.should.equal('orange');
                    res.body._id.should.equal(data.id);
                    done();
                });
        });
    });

    it('should update a SINGLE product on /products/<id> PUT', function(done) {
        chai.request(server)
            .get('/products')
            .end(function(err, res){
                chai.request(server)
                    .put('/products/'+res.body[0]._id)
                    .send({'name': 'Spider'})
                    .end(function(error, response){
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('UPDATED');
                        response.body.UPDATED.should.be.a('object');
                        response.body.UPDATED.should.have.property('name');
                        response.body.UPDATED.should.have.property('_id');
                        response.body.UPDATED.name.should.equal('Spider');
                        done();
                    });
            });
    });

    // it('should delete a SINGLE blob on /products/<id> DELETE', function(done) {
    //     chai.request(server)
    //         .get('/blobs')
    //         .end(function(err, res){
    //             chai.request(server)
    //                 .delete('/blob/'+res.body[0]._id)
    //                 .end(function(error, response){
    //                     response.should.have.status(200);
    //                     response.should.be.json;
    //                     response.body.should.be.a('object');
    //                     response.body.should.have.property('REMOVED');
    //                     response.body.REMOVED.should.be.a('object');
    //                     response.body.REMOVED.should.have.property('name');
    //                     response.body.REMOVED.should.have.property('_id');
    //                     response.body.REMOVED.name.should.equal('Bat');
    //                     done();
    //                 });
    //         });
    // });
});