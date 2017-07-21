/**
 * Created by apoorvaa_gupta on 16/7/17.
 */

const mocha = require('mocha')
    , chai = require('chai')
    , chaiHttp = require('chai-http')
    , expect = chai.expect
    , should = chai.should();

chai.use(chaiHttp)
const api = chai.request("http://localhost:8000/api/users")

it("POST /add should add a user", (done) => {
    api.post('/add').send({
        name: 'Arnav Gupta',
        email: 'arnavgupta@codingblocks.com',
        contact: '9874563210',
        centre: 'Pitampura',
        designation: 'Instructor'
    }).end((e,r) => {
        r.statusCode.should.equal(201)
        r.body.success.should.equal(true)
        done()
    })
})

it("GET /1 should fetch user Arnav", (done) => {
    api.get('/1').end((e,r) => {
        r.statusCode.should.equal(200)
        r.body.success.should.equal(true)
        r.body.data.name.should.equal('Arnav Gupta')
        done()
    })
})

it("GET /2 should fetch error", (done) => {
    api.get('/2').end((e,r) => {
        r.statusCode.should.equal(404)
        r.body.success.should.equal(false)
        r.body.error.message.should.be.a('string')
        done()
    })
})

it("GET / should fetch all users", (done) => {
    api.get('/').end((e,r) => {
        r.statusCode.should.equal(200)
        r.body.success.should.equal(true)
        r.body.data.should.be.an('array')
        r.body.data[0].name.should.equal('Arnav Gupta')
        done()
    })
})

it("PUT /1 should edit user with id 1", (done) => {
    api.put('/1').send({
        email: 'arnav@codingblocks.com',
        contact: '1236547890',
    }).end((e,r) => {
        r.statusCode.should.equal(200)
        r.body.success.should.equal(true)
        done()
    })
})

it("PUT /2 should fetch error", (done) => {
    api.put('/2').send({
        contact: '1236547890',
    }).end((e,r) => {
        r.statusCode.should.equal(404)
        r.body.success.should.equal(false)
        r.body.error.message.should.be.a('string')
        done()
    })
})

it("DELETE /1 should delete user with id 1", (done) => {
    api.delete('/1').end((e,r) => {
        r.statusCode.should.equal(200)
        r.body.success.should.equal(true)
        done()
    })
})

it("DELETE /2 should fetch error", (done) => {
    api.delete('/2').end((e,r) => {
        r.statusCode.should.equal(404)
        r.body.success.should.equal(false)
        r.body.error.message.should.be.a('string')
        done()
    })
})


it("GET / should fetch error", (done) => {
    api.get('/').end((e,r) => {
        r.statusCode.should.equal(404)
        r.body.success.should.equal(false)
        r.body.error.message.should.be.a('string')
        done()
    })
})
