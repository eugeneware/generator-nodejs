var expect = require('<%
    switch (assertionLibrary) {
      case 'chai':
        print ("chai').expect");
        break;

      case 'expect.js':
      default:
        print ("expect.js')");
        break;
    }
%>,
    <%= moduleVarName %> = require('..');

describe('<%= moduleName %>', function() {
  it('should say hello', function(done) {
    expect(<%= moduleVarName %>()).to.equal('Hello, world');
    done();
  });
});
