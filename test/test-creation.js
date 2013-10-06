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

  it('should create expected files', function (done) {
    var expected = [
      'index.js',
      'test/index.spec.js',
      '.gitignore',
      '.jshintrc',
      '.travis.yml',
      ['package.json', /"name": "mymodule"/],
      'Gruntfile.js',
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

    // Lets not install dependencies in test
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });

  it('should create valid gruntfile', function (done) {
    var rules = [
      /!node_modules/,
      /spec: \['test\/\*\*\/\*\.spec\.js'\]/
    ];

    helpers.mockPrompt(this.app, {
      'moduleName': 'mymodule',
      'moduleDesc': 'awesome module',
      'keywords': 'something',
      'githubName': 'octocat',
      'author': 'Octo Cat <main@mail.com>'
    });

    // Lets not install dependencies in test
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      rules.forEach(function(rule) {
        helpers.assertFile('Gruntfile.js', rule);
      });
      done();
    });
  });
});
