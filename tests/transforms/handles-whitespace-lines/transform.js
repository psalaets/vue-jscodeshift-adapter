const adapt = require('../../../src/index');
const describe = require('jscodeshift-helper').describe;

module.exports = adapt((fileInfo, api, options) => {
  const j = api.jscodeshift;

  return j(fileInfo.source)
    .find(j.Identifier)
    .forEach((path) => {
      j(path).replaceWith(
        j.identifier(path.node.name.split('').reverse().join(''))
      );
    })
    .toSource();
});
