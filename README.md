consolation
===========

This module adds some sprinkles to node's vanilla console.

##How it looks
![image](http://i.imgur.com/nQRh15v.png)

##Usage
###Getting started
```
npm install consolation
```

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
console = consolation ({title: 'My file name', time: true});
```
Available options:
 * `title [String]`: the title of your logger, usually (but not necessarily) the name of the file (default is nothing),
 * `time [Boolean]`: whether to display the time on each log line (default is `false`)
