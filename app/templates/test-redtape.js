var redtape = require('redtape'),
    <%- moduleVarName %> = require('..');

var it = redtape({
  beforeEach: function (cb) {
    cb();
  },
  afterEach: function (cb) {
    cb();
  }
});

it('should say hello', function(t) {
  t.equal(<%- moduleVarName %>(), 'Hello, world');
  t.end();
});
