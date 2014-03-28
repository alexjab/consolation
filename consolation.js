var path = require('path');

var colors = require ('colors');

var consolation = function () {
  this.console = console;

  this.options = {
    'title': process.argv.length > 1?path.basename (process.argv[1]):'',
    'use_time': true,
    'use_symbols': true,
    'log_level': 'info'
  };

  var options = arguments[0] || {};
  Object.keys (options).forEach (function (opt) {
    this.options[opt] = options[opt];
  }, this);

  return this;
};

consolation.prototype._args = function (_args) {
  return Array.prototype.slice.call (_args);
};

consolation.prototype._color = function (args, color) {
  args = args.slice ();
  return args.map (function (arg) {return typeof arg === 'string'?arg[color]:arg});
};

consolation.prototype._symbol = function (args, color, symb) {
  if (this.options.use_symbols) {
    args = args.slice ();
    var _symb = {"check": "✓", "cross": "✗", "warning-sign": "⚠", "note": "♪"}[symb] || "";
    args.push (_symb[color] || _symb);
  }
  return args;
};

consolation.prototype._title = function (args) {
  args = args.slice ();
  var title = this.options.title;
  if (title) {
    return [('['+title+']').grey].concat (args);
  } else {
    return args;
  }
};

consolation.prototype._time = function (args) {
  args = args.slice ();
  if (this.options.use_time || this.options.time) {
    var now = new Date ();
    var hms = [now.getHours (), now.getMinutes (), now.getSeconds ()].map (function (item) {
      item = item.toString ();
      item = (item.length === 2)?item:'0'+item;
      return item;
    });
    var ms = now.getMilliseconds ().toString ();
    if (ms.length === 0) {
      ms += '000';
    } else if (ms.length === 1) {
      ms += '00';
    } else if (ms.length === 2) {
      ms += '0';
    }
    return ([(hms.join (':')+'.'+ms).blue]).concat (args);
  } else {
    return args;
  }
};

consolation.prototype._level = function (fn, level) {
  if (level === 'err' && fn === 'err') {
    return true;
  } if (level === 'warn' && (fn === 'warn' || fn === 'err')) {
    return true;
  } if (level === 'ok' && (fn === 'ok' || fn === 'warn' || fn === 'err')) {
    return true;
  } if (level === 'info' && (fn === 'info' || fn === 'ok' || fn === 'warn' || fn === 'err')) {
    return true;
  }
  return false;
};

consolation.prototype._fn = function (_arguments, color, symb, fn) {
  if (this._level (fn, this.options.log_level)) {
    var args = this._args (_arguments);
    args = this._color (args, color);
    args = this._symbol (args, color, symb);
    args = this._title (args);
    args = this._time (args);
    return console.log.apply (this, args);
  }
  return false;
};

consolation.prototype.log = function () {
  return this.console.log.apply (this, arguments);
};

consolation.prototype.ok = function () {
  return this._fn (arguments, 'green', 'check', 'ok');
};

consolation.prototype.err = function () {
  return this._fn (arguments, 'red', 'cross', 'err');
};

consolation.prototype.info = function () {
  return this._fn (arguments, 'cyan', 'note', 'info');
};

consolation.prototype.warn = function () {
  return this._fn (arguments, 'yellow', 'warning-sign', 'warn');
};


module.exports = consolation;
