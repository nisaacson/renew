var async = require('async')
module.exports = function (data, callback) {
  var maxAttempts = data.maxAttempts || 10
  var command = data.command
  var params = data.params
  var complete = false
  var attempt = 0
  var output
  async.until(
    function () {
      return complete
    },
    function (cb) {
      if (attempt > maxAttempts) {
        return cb({
          message: 'command failed',
          error: 'max attempts reached',
          attempt: attempt,
          maxAttempts: maxAttempts,
          stack: new Error().stack
        })
      }
      if (params) {
        command(params, function (err, reply) {
          if (!err) {
            complete = true
            output = reply
            return cb()
          }
          attempt += 1
          cb()
        })
        return
      }
      command(function (err, reply) {
        if (!err) {
          output = reply
          complete = true
          return cb()
        }
        attempt += 1
        cb()
      })
    },
    function (err) {
      callback(err, output)
    }
  )
}
