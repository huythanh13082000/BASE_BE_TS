import chai from 'chai'
import chaiHttp from 'chai-http'
import {describe, it} from 'mocha'
import {app} from '../src/server' // import app là server express được khởi tạo

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /api/vi/users', () => {
  it('should return list of users', (done) => {
    chai
      .request(app)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
