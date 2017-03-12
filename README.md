consolation
===========
[![NPM version](https://badge.fury.io/js/consolation.png)](http://badge.fury.io/js/consolation)

This module adds some sprinkles to node's vanilla console.

##How it looks
![image](https://cloud.githubusercontent.com/assets/1788596/5917370/37076b12-a61c-11e4-8b7b-76e2d1a2d902.png)

##Getting started
###Installation
```
npm install consolation
```

### Basic usage
```
var consolation = require ('consolation');

var console = new consolation ();

console.ok ('This console.log is OK');
console.info ('This console.log is an INFO');
console.err ('This console.log is an ERROR');
console.warn ('This console.log is a WARNING');
```

###Options
You can pass options when creating the object:
```
var console = new consolation ({
  title: 'My cool title', use_time: false, use_symbols: false, log_level: 'warn'
});
```
Available options:
 * `title [String]`: the title of your logger, usually (but not necessarily) the name of the file (default is nothing),
 * `use_time [Boolean]`: whether to display the time on each log line (default `true`),
 * `use_date [Boolean]`: whether to display the date on each log line (default `true`),
 * `use_symbols [Boolean]`: whether to display a nice unicode symbol at the end of each log line (default is `true`),
 * `log_level [String]`: the minimum level from which logs are displayed (can take values from `['info', 'ok', 'warn', 'err']`, and default is `'info'`),
 * `monochrome [Boolean]`: output black and white log lines. This is useful when you need to output log lines to a file (default is `false`).

##Tests
Testing is done using [mocha](http://mochajs.org/) and [should.js](https://github.com/visionmedia/should.js/) so you might wanna get your hands on those as well:
```
make install && npm install mocha -g
```
and then:
```
make test
```

## Misc.
PR, comments and suggestions are welcome !
