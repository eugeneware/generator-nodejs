var expect = require('expect.js'),
    <%= moduleVarName %> = require('..');

describe('<%= moduleName %>', function() {
  it('should say hello', function(done) {
    expect(<%= moduleVarName %>()).to.equal('Hello, world');
    done();
  });
});
