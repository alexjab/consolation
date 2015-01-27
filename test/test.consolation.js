var should = require ('should');

var consolation = require ('../consolation.js');

var console = new consolation ({title: 'test.consolation.js'});

console.log ('Running tests for consolation...');
console.info ('INFO', {'foo': 'bar', 'baz': true}, ['foo', 'bar', 'baz'], null, undefined);
console.ok ('OK', {'foo': 'bar', 'baz': true}, ['foo', 'bar', 'baz'], null, undefined);
console.warn ('WARNING', {'foo': 'bar', 'baz': true}, ['foo', 'bar', 'baz'], null, undefined);
console.err ('ERR', {'foo': 'bar', 'baz': true}, ['foo', 'bar', 'baz'], null, undefined);

describe ('consolation.options', function () {
  it ('should override the default options with the parameters', function (done) {
    var console = new consolation ({
      title: 'some test',
      use_time: true,
      use_date: true,
      use_symbols: true,
      log_level: 'warn',
      monochrome: true,
      foo: 'bar',
      baz: true,
      potato: 42
    });

    console.options.should.eql ({'title': 'some test', 'use_time': true, 'use_date': true, 'use_symbols': true, 'log_level': 'warn', 'monochrome': true, 'foo': 'bar', 'baz': true, 'potato': 42});

    done ();
  });
});

describe ('consolation._args', function () {
  it ('should return an array of arguments', function (done) {
    var test = function () {
      console._args (arguments).should.eql (['foo', 'bar', 'baz', 'potato', true, 42]);

      done ();
    } ('foo', 'bar', 'baz', 'potato', true, 42);
  });
});

describe ('consolation._color', function () {
  it ('should return a color string with special chars', function (done) {
    console._color ('info').should.equal ('\x1B[36m');
    console._color ('ok').should.equal ('\x1B[32m');
    console._color ('warn').should.equal ('\x1B[33m');
    console._color ('err').should.equal ('\x1B[31m');

    done ();
  });
});

describe ('consolation._symbol', function () {
  it ('should return a symbol char', function (done) {
    console._symbol ('info').should.equal ('♪');
    console._symbol ('ok').should.equal ('✓');
    console._symbol ('warn').should.equal ('⚠');
    console._symbol ('err').should.equal ('✗');

    done ();
  });
});

describe ('consolation._title', function () {
  it ('should return a colored title', function (done) {
    var title = 'My very long title !';
    var console = new consolation ({
      title: title
    });
    console._title ().should.eql ('\x1B[90m['+title+']');

    done ();
  });
});

describe ('consolation._time', function () {
  it ('should return an array with a prepended time', function (done) {
    var console = new consolation ({
      use_time: true
    });
    var actual = console._time ();
    var expected = new RegExp ('[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}');
    actual.length.should.be.above (0);
    (typeof actual).should.equal ('string');
    actual.search (expected).should.be.above (-1);

    var actual_color = actual.match (expected).input;
    var actual_time = actual.match (expected)[0];
    actual_color.should.equal ('\x1B[34m'+actual_time);

    done ();
  });
});

describe ('consolation._date', function () {
  it ('should return an array with a prepended date', function (done) {
    console = new consolation ({
      use_date: true
    });
    var actual = console._date ();
    var now = new Date ();
    var ymd = [now.getFullYear (), now.getMonth () + 1, now.getDate ()].map (function (item) {
      item = item.toString ();
      item = (item.length === 1)?'0'+item:item;
      return item;
    });

    actual.length.should.be.above (0);
    var expected = new RegExp ("[0-9]{4}-[0-9]{2}-[0-9]{2}");
    
    actual.search (expected).should.be.above (-1);

    var actual_color = actual.match (expected).input;
    var actual_time = actual.match (expected)[0];
    actual_color.should.equal ('\x1B[34m'+actual_time);

    done ();
  });
});

describe ('consolation._level', function () {
  it ('should return true or false depending on the method and the log level option', function (done) {
    var levels = ['info', 'ok', 'warn', 'err'];
    var fns = {'info': [true, false, false, false], 'ok': [true, true, false, false], 'warn': [true, true, true, false], 'err': [true, true, true, true]};

    levels.forEach (function (level, index) {
      levels.forEach (function (fn) {
        var actual = console._level (fn, level);
        var expected = fns[fn][index];
        (expected === actual).should.be.true;
      });
    });

    done ();
  });
});

