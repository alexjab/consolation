var colors = require ('colors');

var consolation = module.exports = function () {
  var root = console;

  root.options = {
    'title': '',
    'time': false
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
    var _symb = {"tick": "✓", "ballot": "✗", "warning-sign": "⚠"}[symb] || "";
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
      return ([([now.getHours (), now.getMinutes (), now.getSeconds ()].join (':')+'.'+now.getMilliseconds ()).grey]).concat (args);
    } else {
      return args;
    }
  };

  root._fn = function (_arguments, color, symb) {
    var args = root._args (_arguments);
    args = root._color (args, color);
    args = root._symbol (args, color, symb);
    args = root._title (args);
    args = root._time (args);
    return console.log.apply (this, args);
  };

  root.ok = function () {
    return root._fn (arguments, 'green', 'tick');
  };

  root.err = function () {
    return root._fn (arguments, 'red', 'ballot');
  };

  root.info = function () {
    return root._fn (arguments, 'cyan');
  };

  root.warn = function () {
    return root._fn (arguments, 'yellow', 'warning-sign');
  };

  root.blob = function () {
    return console.log.apply (this, ['test %d, %d'.green, 3, 8]);
    //return console.log.apply (this, arguments);
  };

  return root;
};