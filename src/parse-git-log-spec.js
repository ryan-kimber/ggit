var la = require('lazy-ass');
var is = require('check-more-types');

/* global describe, it */
describe('parse git log', function () {
  var parsers = require('./parse-git-log');

  describe('parse full commit log', function () {
    var parse = parsers.parseCommitLog;

    it('is a function', function () {
      la(is.fn(parse));
    });

    it('handles "commit" inside message', function () {
      var log = [
        'commit 7fbeb0ada137bc93493731df60bada794d95b13b',
        'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        'Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        '',
        '   commit fake word',
        '',
        '   This is the main logic',
        ''
      ].join('\n');
      var parsed = parse(log);
      la(is.array(parsed), 'returns list of commits', parsed);
      la(parsed.length === 1, 'finds 1 commit', parsed.length);

      var first = parsed[0];
      la(is.object(first), 'creates object', first);

      la(first.id === '7fbeb0ada137bc93493731df60bada794d95b13b', 'id');
      la(/^commit fake word/.test(first.message), 'message', first);
      la(/main logic/.test(first.body), 'body', first);
    });

    it('parses list of commits', function () {
      var log = [
        'commit 7fbeb0ada137bc93493731df60bada794d95b13b',
        'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        'Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        '',
        '   chore(main): Main file with parsing of the message',
        '',
        '   This is the main logic',
        '',
        'commit 8043da809a8e156311016d289f11160046500f58',
        'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        'Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>',
        '',
        '   chore(package): dummy version string',
        ''
      ].join('\n');
      var parsed = parse(log);

      la(is.array(parsed), 'returns list of commits', parsed);
      la(parsed.length === 2, 'finds 2 commits', parsed.length);

      var first = parsed[0];
      la(is.object(first), 'creates object', first);

      la(first.id === '7fbeb0ada137bc93493731df60bada794d95b13b', 'id');
      la(/^chore/.test(first.message), 'message', first);
      la(/main logic/.test(first.body), 'body', first);

      var second = parsed[1];
      la(/dummy version/.test(second.message), 'second message', second);
    });
  });

  describe('parse one line log', function () {
    var parse = parsers.parseOneLineLog;

    it('is a function', function () {
      la(is.fn(parse));
    });

    it('works with empty string input', function () {
      var parsed = parse('');
      la(is.array(parsed));
      la(is.empty(parsed));
    });

    it('parses list of commits', function () {
      var log = [
        '7fbeb0ada137bc93493731df60bada794d95b13b foo',
        '8043da809a8e156311016d289f11160046500f58 bar',
        '55164909476cbcf6788829221e56ff9a51a08933 baz'
      ].join('\n');
      var parsed = parse(log);
      la(is.array(parsed));
      la(parsed.length === 3, 'finds 3 items');
      la(is.object(parsed[0]), 'creates object', parsed[0]);
      la(parsed[0].id === '7fbeb0ada137bc93493731df60bada794d95b13b', 'id');
      la(parsed[0].message === 'foo', 'message');
    });
  });
});
