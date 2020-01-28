var assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
//const app = '..controllers/userManagement.controller.js';
const app = require('../app')
var mongoose = require('mongoose');

chai.use(chaiHttp);
chai.should();


describe("UserManagement test", () => {
    describe("POST /", () => {        
        it("should  register User and get response as 201", (done) => {
            var req= { "email" :"1ananthpr11222211@gmail.com", "firstName":"ananth", "lastName":"prasad", "phoneNumber":"9894561237","password":"Nullvoid@123" }         
            chai.request(app)
                 .post('/api/um/register')
                 .send(req)
                 .end((err, res) => {
                     debugger;
                    // console.log('aa');
                     console.log(res);
                     res.should.have.status(201);
                     //res.body.should.be.a('object');
                     done();
                  });
         });
         it("should login application and get response as 200", (done) => {
            var req= { "email" :"ananthpr2222@gmail.com","password":"Nullvoid@123" }         
            chai.request(app)
                 .post('/api/um/login')
                 .send(req)
                 .end((err, res) => {
                     console.log(res);
                     res.should.have.status(200);
                     
                     done();
                  });
         });

         it("should not allowed invalid userid and password", (done) => {
            var req= { "email" :"ananthpr2222@gmail.com","password":"Nullvoid" }         
            chai.request(app)
                 .post('/api/um/login')
                 .send(req)
                 .end((err, res) => {
                     console.log(res);
                     res.should.have.status(400);
                     res.body.should.be.a('object');
                     done();
                  });
         })
                  
         it("should  not allow existing mail ID", (done) => {
            var req= { "email" :"ananthpr122221@gmail.com", "firstName":"ananth", "lastName":"prasad", "phoneNumber":"9894561237","password":"Nullvoid@123" }         
            chai.request(app)
                 .post('/api/um/register')
                 .send(req)
                 .end((err, res) => {
                     debugger;
                    // console.log('aa');
                     console.log(res);
                     res.should.have.status(400);                    
                     done();
                  });
         });
    });
});