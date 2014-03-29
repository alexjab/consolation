var path = require('path');

var consolation = function () {
  this.console = console;

  this.options = {
    title: process.argv.length > 1?path.basename (process.argv[1]):'',
    use_time: true,
    use_symbols: true,
    log_level: 'info'
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

consolation.prototype._color = function (fn) {
  var colors = {
    info : '\x1B[36m',
    ok : '\x1B[32m',
    err : '\x1B[31m',
    warn : '\x1B[33m'
  };
  return colors[fn]||'';
};

consolation.prototype._symbol = function (fn) {
  if (this.options.use_symbols) {
    return {ok: '✓', err: '✗', warn: '⚠', info: '♪'}[fn] || '';
  }
  return '';
};

consolation.prototype._title = function () {
  return '\x1B[90m['+this.options.title+']\x1B[39m';
};

consolation.prototype._time = function () {
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
  return '\x1B[34m'+hms.join (':')+'.'+ms+'\x1B[39m';
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

consolation.prototype._fn = function (_arguments, fn) {
  if (this._level (fn, this.options.log_level)) {
    var _args = this._args (_arguments);

    var args = [];
    if (this.options.use_time) {
      args.push (this._time ());
    }
    if (this.options.title) {
      args.push (this._title ());
    }
    args.push (this._color (fn));
    args = args.concat (_args);
    if (this.options.use_symbols) {
      args.push (this._symbol (fn));
    }
    args.push ('\x1B[39m');
    return console.log.apply (this, args);
  }
  return false;
};

consolation.prototype.log = function () {
  return this.console.log.apply (this, arguments);
};

consolation.prototype.ok = function () {
  return this._fn (arguments, 'ok');
};

consolation.prototype.err = function () {
  return this._fn (arguments, 'err');
};

consolation.prototype.info = function () {
  return this._fn (arguments, 'info');
};

consolation.prototype.warn = function () {
  return this._fn (arguments, 'warn');
};


module.exports = consolation;
