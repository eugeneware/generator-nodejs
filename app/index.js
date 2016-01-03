'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    wiring = require('html-wiring'),
    camelCase = require('lodash.camelcase'),
    slug = require('lodash.kebabcase'),
    mkdirp = require('mkdirp').sync,
    gitconfig = require('git-config');

var NodejsGenerator = module.exports = function NodejsGenerator(args, options, config) {
  yeoman.Base.apply(this, arguments);
  this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodejsGenerator, yeoman.Base);

NodejsGenerator.prototype.install = function () {
  if (!this.options['skip-install']) {
    this.installDependencies({
      bower: false
    });
  }
};

NodejsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var config = gitconfig.sync();

  var prompts = [
    {
      type: 'input',
      name: 'moduleName',
      message: 'node.js module name:',
      default: path.basename(process.cwd())
    },
    {
      type: 'input',
      name: 'moduleDesc',
      message: 'Module description'
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Module keywords',
      filter:
        function (value) {
          if (typeof value === 'string') {
            value = value.split(',');
          }
          return value
            .map(function (val) {
              return val.trim();
            })
            .filter(function (val) {
              return val.length > 0;
            })
        }
    },
    {
      type: 'confirm',
      name: 'useGrunt',
      message: 'Use grunt?',
      default: true
    },
    {
      type: 'list',
      name: 'testFramework',
      message: 'Testing framework',
      choices: ['mocha', 'tape', 'redtape'],
      default: 'mocha'
    },
    {
      type: 'list',
      name: 'assertionLibrary',
      message: 'Assertion Library',
      choices: ['expect.js', 'chai', 'none'],
      default: 'expect.js'
    },
    {
      type: 'input',
      name: 'githubName',
      message: 'Your github username',
      default: (config.github && config.github.user) || ''
    },
    {
      type: 'input',
      name: 'author',
      message: 'Author name',
      default:
        ((config.user && config.user.name) || '') +
        (' <' + ((config.user && config.user.email) || '') + '>')
    }
  ];

  this.prompt(prompts, function (props) {
    this.moduleName = slug(props.moduleName);
    this.moduleVarName = camelCase(props.moduleName);
    this.moduleDesc = props.moduleDesc;
    this.keywords = props.keywords;
    this.githubName = props.githubName;
    this.author = props.author;
    this.copyrightName = props.author.replace(/<[^>]*?>/gm, '').trim();
    this.testFramework = props.testFramework;
    this.assertionLibrary = props.assertionLibrary;
    this.useGrunt = props.useGrunt;

    this.dequote = function (str) {
      return str.replace(/\"/gm, '\\"');
    };

    cb();
  }.bind(this));
};

NodejsGenerator.prototype.build = function build() {
  this.template('_package.json', 'package.json');

  if (this.useGrunt) {
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.copy('jshintrc', '.jshintrc');
  }
  this.copy('travis.yml', '.travis.yml');
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');
};

NodejsGenerator.prototype.testFrameworks = function mocha() {
  mkdirp('test');
  mkdirp('test/fixtures');
  this.copy('lib.js', 'index.js');

  switch (this.testFramework) {
    case 'mocha':
      this.template('test.js', 'test/index.js');
      break;

    case 'tape':
      this.template('test-tape.js', 'test/index.js');
      break;

    case 'redtape':
      this.template('test-redtape.js', 'test/index.js');
      break;

    default:
      break;
  }
};
