var should = require('should');
var renew = require('../index')
describe('Renew test', function () {
  it('should renew command without params until it completes', function (done) {
    var count = 0
    var result = 'foo'
    var command = function (cb) {
      count += 1
      if (count > 3) {
        return cb(null, result)
      }
      cb('error here')
    }
    var data = {
      command: command,
      maxAttempts: 10
    }
    renew(data, function (err, reply) {
      should.not.exist(err)
      should.exist(reply)
      reply.should.eql(result)
      count.should.eql(4)
      done()
    })
  })

  it('should renew command with params until it completes', function (done) {
    var count = 0
    var result = 'foo'
    var params = ['bar']
    var command = function (data, cb) {
      data.should.eql(params)
      count += 1
      if (count > 3) {
        return cb(null, result)
      }
      cb('error here')
    }
    var data = {
      command: command,
      params: params,
      maxAttempts: 10
    }
    renew(data, function (err, reply) {
      should.not.exist(err)
      should.exist(reply)
      reply.should.eql(result)
      count.should.eql(4)
      done()
    })
  })
})
