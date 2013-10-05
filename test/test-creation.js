/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('nodejs generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('nodejs:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'index.js',
      'test/index.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      ['package.json', /"name": "mymodule"/],
      ['Gruntfile.js', /!node_modules/],
      'README.md',
      'LICENSE'
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': 'mymodule',
      'moduleDesc': 'awesome module',
      'keywords': 'something',
      'githubName': 'octocat',
      'author': 'Octo Cat <main@mail.com>'
    });

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
