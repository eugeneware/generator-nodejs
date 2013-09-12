# generator-nodejs

A node.js module scaffolding generator for [Yeoman](http://yeoman.io).

[![Build Status](https://secure.travis-ci.org/eugeneware/generator-nodejs.png?branch=master)](https://travis-ci.org/eugeneware/generator-nodejs)

### Installation

To install generator-nodejs from npm, run:

```
$ npm install -g generator-nodejs
```

Finally, initiate the generator:

```
$ yo nodejs
```

![generator-nodejs screenshot](https://raw.github.com/eugeneware/generator-nodejs/master/screenshot.png)

This generator will install the following files:

* package-json - initialized with the answers to all your questions.
* Gruntfile.js - configured to use the following grunt modules:
    * grunt-complexity - show code complexity
    * grunt-contrib-jshint - run code through jshint
    * grunt-contrib-watch - watch for changes then run tests
    * grunt-mocha-cli - run mocha tests (because `mocha -w` sucks)
* .jshintrc - with some sane defaults (for me anyway!)
* .travis.yml - set up so you can push and get [travis-ci](http://travis-ci.org)
   continous integration tests.
* .gitignore - ignore the usual cruft.
* LICENSE - BSD-3-Clause initialized with your details.
* README.md - Initialized with your details and travis-ci badges.
* index.js - Initial library file
* test/index.js - First mocha unit test

