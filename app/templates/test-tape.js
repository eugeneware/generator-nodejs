var test = require('tape'),
    <%= moduleVarName %> = require('..');

test('should say hello', function(t) {
  t.equal(<%= moduleVarName %>(), 'Hello, world');
  t.end();
});
