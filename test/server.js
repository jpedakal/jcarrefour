var chai = require('chai');
var assert = require('assert');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('all apis', function () {
    it('should be welcome mail', function (done) {
        chai.request('http://localhost:3000')
            .get('/welcome')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });

    it('should Register the user details', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/user/register')
            .send({
                "first_name": "jayakrishna",
                "last_name": "pedakalam",
                "email": "jaya@gmail.com",
                "cpf": "23145346",
                "gender": "male",
                "date_of_birth": "15-06-1991",
                "mobile": "7989508093",
                "password": "aaaaa",
                "confirm_password": "aaaaa"
            })
            .end(function(err,res){
                res.should.have.status(200);
                done();
            })
    });    
});


