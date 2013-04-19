# Renew
Execute an asyncronous function repeatedly until it completes or the max number of attempts are reached

# Installation

```bash
npm -S install renew
```

# Usage

```javascript
var renew = require('renew')
var inspect = require('eyespect').inspector();
var params = ['foo', 'params']
var command = function (data, cb) {
   inspect(data, 'command called with params')
   setTimeout(function () {
     cb(null, 'foo result')
   })
}

var data = {
  command: command,
  params: params,
  maxAttempts: 4
}
renew(data, function (err, reply) {

})

```

# Test
