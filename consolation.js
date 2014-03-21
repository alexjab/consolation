var colors = require ('colors');

var consolation = module.exports = function () {
  var root = console;

  root.options = {
    'title': '',
    'time': false,
    'log_level': 'info'
  };

  var options = arguments[0] || {};
  Object.keys (options).forEach (function (opt) {
    root.options[opt] = this[opt];
  }, options);

  root._args = function (_args) {
    return Array.prototype.slice.call (_args);
  };

  root._color = function (args, color) {
    args = args.slice ();
    return args.map (function (arg) {return typeof arg === 'string'?arg[color]:arg});
  };

  root._symbol = function (args, color, symb) {
    args = args.slice ();
    var _symb = {"check": "✓", "cross": "✗", "warning-sign": "⚠", "note": "♪"}[symb] || "";
    args.push (_symb[color] || _symb);
    return args;
  };

  root._title = function (args) {
    args = args.slice ();
    var title = root.options.title;
    if (title) {
      return [('['+title+']').grey].concat (args);
    } else {
      return args;
    }
  };

  root._time = function (args) {
    args = args.slice ();
    if (root.options.time) {
      var now = new Date ();
      return ([([now.getHours (), now.getMinutes (), now.getSeconds ()].join (':')+'.'+now.getMilliseconds ()).blue]).concat (args);
    } else {
      return args;
    }
  };

  root._level = function (fn, level) {
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

  root._fn = function (_arguments, color, symb, fn) {
    if (root._level (fn, root.options.log_level)) {
      var args = root._args (_arguments);
      args = root._color (args, color);
      args = root._symbol (args, color, symb);
      args = root._title (args);
      args = root._time (args);
      return console.log.apply (this, args);
    }
    return false;
  };

  root.ok = function () {
    return root._fn (arguments, 'green', 'check', 'ok');
  };

  root.err = function () {
    return root._fn (arguments, 'red', 'cross', 'err');
  };

  root.info = function () {
    return root._fn (arguments, 'cyan', 'note', 'info');
  };

  root.warn = function () {
    return root._fn (arguments, 'yellow', 'warning-sign', 'warn');
  };

  return root;
};
