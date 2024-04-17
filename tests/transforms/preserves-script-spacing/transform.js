import adapt from '../../../src/index.js';

export default adapt((fileInfo, api, options) => {
  return api.jscodeshift(fileInfo.source)
    .findVariableDeclarators('foo')
    .renameTo('bar')
    .toSource();
});
