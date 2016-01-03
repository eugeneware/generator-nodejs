<% if (assertionLibrary === 'none') { -%>
var assert = require('assert'),
    <%- moduleVarName %> = require('..');

describe('<%- moduleName %>', function() {
  it('should say hello', function(done) {
    assert.equal(<%- moduleVarName %>(), 'Hello, world');
    done();
  });
});
<% } else { -%>
var expect = require('<%
    var out = '';
    switch (assertionLibrary) {
      case 'chai':
        out = "chai').expect";
        break;

      case 'expect.js':
      default:
        out = "expect.js')";
        break;
    }
%><%- out %>,
    <%- moduleVarName %> = require('..');

describe('<%- moduleName %>', function() {
  it('should say hello', function(done) {
    expect(<%- moduleVarName %>()).to.equal('Hello, world');
    done();
  });
});<% } %>
