'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    gitconfig = require('git-config');

var NodejsGenerator = module.exports = function NodejsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodejsGenerator, yeoman.generators.Base);

NodejsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

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
          return value.split(',')
            .map(function (val) {
              return val.trim();
            })
            .filter(function (val) {
              return val.length > 0;
            })
        }
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
    this.moduleName = this._.slugify(props.moduleName);
    this.moduleVarName = this._.camelize(props.moduleName);
    this.moduleDesc = props.moduleDesc;
    this.keywords = props.keywords;
    this.githubName = props.githubName;
    this.author = props.author;
    this.copyrightName = props.author.replace(/<[^>]*?>/gm, '').trim();

    this.dequote = function (str) {
      return str.replace(/\"/gm, '\\"');
    };

    cb();
  }.bind(this));
};

NodejsGenerator.prototype.build = function build() {
  this.template('_package.json', 'package.json');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('travis.yml', '.travis.yml');
  this.copy('gitignore', '.gitignore');
  this.copy('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');
};

NodejsGenerator.prototype.mocha = function mocha() {
  this.mkdir('test');
  this.mkdir('test/fixtures');
  this.copy('lib.js', 'index.js');
  this.template('test.js', 'test/index.spec.js');
};
