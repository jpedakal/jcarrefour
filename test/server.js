var chai = require('chai');
var assert = require('assert');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
var expect= chai.expect;
var answer = 43;
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

    it('should be equal', function () {
        // AssertionError: expected 43 to equal 42.
        expect(answer).to.equal(43);
    })
});


