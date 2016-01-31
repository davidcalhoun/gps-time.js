# gps-time.js 1.0.1
[![Build Status](https://travis-ci.org/davidcalhoun/gps-time.js.svg?branch=master)](https://travis-ci.org/davidcalhoun/gps-time.js)

Small utility to convert times between GPS epoch (midnight January 6, 1980) and Unix epoch (midnight January 1, 1970), taking into account leap seconds.

No dependencies!  Very small: 464 bytes gzipped.

Works on the client and on the server (in Node.js).


# Usage
AMD and CommonJS are supported, with a fallback that defines this utility at window.gpsTime

In Node, you can bring in this utility with this:

```javascript
var gpsTime = require('gps-time');
```


## Converting from Unix time to GPS time.
```javascript
var unixMS = Date.now();  // 1454168480000
gpsTime.toGPSMS(unixMS);  // 1138203697000
```

## Converting from GPS time to Unix time.
```javascript
var gpsMS = 1138203697000;
gpsTime.toUnixMS(gpsMS);  // 1454168480000
```


# Tests
This comes with a small test suite which can be run like this:

```
$ npm install --dev
$ npm test
```

# License
[Licenced under MIT](https://github.com/davidcalhoun/gps-time.js/blob/master/LICENSE)