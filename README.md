# User Management System API

Sample API for User Management System built using NodeJS

The following tools and technologies being used with their best practices:

  - [Express](https://expressjs.com/) - Web application Framework for NodeJS
  - [winston](https://github.com/winstonjs/winston) - Universal logging library with support for multiple transports(i.e. savings log in a file).
  - [http-errors](https://www.npmjs.com/package/http-errors) - Create HTTP errors for Express, Koa, Connect, etc. with ease
  - [cors](https://github.com/expressjs/cors) - Express middleware to allow Cross Origin Resource sharing.
  - [compression](https://github.com/expressjs/compression) - Node.js compression middleware. Supported compression codings are deflate and gzip.
  - [cookie-parser](https://github.com/expressjs/cookie-parser) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  - [hbs](https://handlebarsjs.com/) - Express.js template engine plugin for Handlebars.

  - [helmet](https://github.com/helmetjs/helmet) - To secure Express/Connect apps from various well-known web vulnerabilities by setting HTTP headers.




## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install compression
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var compression = require('compression')
```

```js
var compression = require('compression')
var express = require('express')

var app = express()
app.use(compression({filter: shouldCompress}))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
```

### res.flush

This module adds a `res.flush()` method to force the partially-compressed
response to be flushed to the client.

## Examples

### express/connect

When using this module with express or connect, simply `app.use` the module as
high as you like. Requests that pass through the middleware will be compressed.

```js
var compression = require('compression')
var express = require('express')

var app = express()

// compress all responses
app.use(compression())

// add all routes
```

### Server-Sent Events

Because of the nature of compression this module does not work out of the box
with server-sent events. To compress content, a window of the output needs to
be buffered up in order to get good compression. Typically when using server-sent
events, there are certain block of data that need to reach the client.

You can achieve this by calling `res.flush()` when you need the data written to
actually make it to the client.

```js
var compression = require('compression')
var express = require('express')

var app = express()

// compress responses
app.use(compression())

// server-sent event stream
app.get('/events', function (req, res) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    res.write('data: ping\n\n')

    // !!! this is the important part
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
})
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/compression.svg
[npm-url]: https://npmjs.org/package/compression
[travis-image]: https://img.shields.io/travis/expressjs/compression/master.svg
[travis-url]: https://travis-ci.org/expressjs/compression
[coveralls-image]: https://img.shields.io/coveralls/expressjs/compression/master.svg
[coveralls-url]: https://coveralls.io/r/expressjs/compression?branch=master
[downloads-image]: https://img.shields.io/npm/dm/compression.svg
[downloads-url]: https://npmjs.org/package/compression
