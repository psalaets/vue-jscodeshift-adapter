import adapt from '../../../src/index.js';

export default adapt((fileInfo, api, options) => {
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
