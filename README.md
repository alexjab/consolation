consolation
===========
[![NPM version](https://badge.fury.io/js/consolation.png)](https://www.npmjs.org/package/consolation)

This module adds some sprinkles to node's vanilla console. It uses [colors.js](https://github.com/Marak/colors.js) and some cool unicode characters.

##How it looks
![image](http://i.imgur.com/0W0I2Ka.png)

##Getting started
###Installation
```
npm install consolation
```

### Basic usage
```
var consolation = require ('consolation');

console = consolation ();

console.ok ("This console.log is OK");
console.info ("This console.log is an INFO");
console.err ("This console.log is an ERROR");
console.warn ("This console.log is a WARNING");
```

###Options
You can pass options when creating the object:
```
console = consolation ({title: 'My file name', time: true, log_level: 'warn'});
```
Available options:
 * `title [String]`: the title of your logger, usually (but not necessarily) the name of the file (default is nothing),
 * `time [Boolean]`: whether to display the time on each log line (default is `false`),
 * `log_level [String]`: the minimum level from which logs are displayed (can take values from `['info', 'ok', 'warn', 'err']`, and default is `'info'`).

##Tests
Testing is done using [mocha](http://visionmedia.github.io/mocha/) and [should.js](https://github.com/visionmedia/should.js/), so you might wanna get your hands on those as well:
```
make install && npm install mocha -g
```
and then:
```
make test
```

## Misc.
PR, comments and suggestions are welcome !
