var should = require ('should');

var consolation = require ('../consolation.js');

console = consolation ({title: 'test.consolation.js', time: true});

console.info ('Running tests for consolation...');
console.ok ("This console.log is OK");
console.info ("This console.log is an INFO");
console.err ("This console.log is an ERROR");
console.warn ("This console.log is a WARNING");

describe ('consolation.options', function () {
  it ('should override the default options with the parameters', function (done) {
    var console = consolation ({
      'title': 'some test',
      'time': true,
      'foo': 'bar',
      'baz': true,
      'potato': 42
    });

    console.options.should.eql ({'title': 'some test', 'time': true, 'foo': 'bar', 'baz': true, 'potato': 42});

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
  it ('should return an array of colored strings and untouched other types', function (done) {
    console._color ([
      'foo', 4, 8, undefined, null, {'one': 1}, ['one', 1]
    ], 'green').should.eql ([
      'foo'.green, 4, 8, undefined, null, {'one': 1}, ['one', 1]
    ]);
    console._color ([
      'bar', 15, 16, undefined, null, {'two': 2}, ['two', 2]
    ], 'red').should.eql ([
      'bar'.red, 15, 16, undefined, null, {'two': 2}, ['two', 2]
    ]);
    console._color ([
      'baz', 23, 42, undefined, null, {'three': 3}, ['three', 3]
    ], 'yellow').should.eql ([
      'baz'.yellow, 23, 42, undefined, null, {'three': 3}, ['three', 3]
    ]);

    done ();
  });
});

describe ('consolation._symbol', function () {
  it ('should return an array with an appended symbol', function (done) {
    var list = ['foo', 'bar', 'baz', 0, 1, 2, undefined];
    var expected = list.slice (0)
    expected.push ("✓".green);
    console._symbol (list, 'green', 'tick').should.eql (expected);

    expected = list.slice (0)
    expected.push ("✓".red);
    console._symbol (list, 'red', 'tick').should.eql (expected);

    expected = list.slice (0)
    expected.push ("✗".red);
    console._symbol (list, 'red', 'ballot').should.eql (expected);

    done ();
  });
});

describe ('consolation._title', function () {
  it ('should return an array with an prepended title', function (done) {
    var title = "My very long title !";
    console = consolation ({
      'title': title
    });
    var list = ['foo', 'bar', 'baz', 0, 1, 2, undefined];
    var expected = list.slice (0)
    expected.unshift (('['+title+']').grey);
    console._title (list).should.eql (expected);

    done ();
  });
});

describe ('consolation._time', function () {
  it ('should return an array with a prepended time', function (done) {
    console = consolation ({
      'time': true
    });
    var list = ['foo', 'bar', 'baz', 0, 1, 2, undefined];
    var actual = console._time (list);
    var expected = new RegExp ("[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}\.[0-9]{1,3}");
    actual.length.should.be.above (0);
    actual = actual[0];
    (typeof actual).should.equal ('string');
    actual.search (expected).should.be.above (-1);

    var actual_color = actual.match (expected).input;
    var actual_time = actual.match (expected)[0];
    actual_color.should.equal (actual_time.grey);

    done ();
  });
});

