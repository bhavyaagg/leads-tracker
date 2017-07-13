/**
 * Created by championswimmer on 13/07/17.
 */
const mocha = require('mocha')
  , chai = require('chai')
  , chaiHttp = require('chai-http')
  , expect = chai.expect
  , should = chai.should();

chai.use(chaiHttp)
const api = chai.request("http://localhost:8000/api/courses")

it("POST /add should add a course", (done) => {
  api.post('/add').send({
    name: 'Launchpad'
  }).end((e,r) => {
    r.statusCode.should.equal(201)
    done()
  })
})