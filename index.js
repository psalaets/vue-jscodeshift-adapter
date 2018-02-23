const compiler = require('vue-template-compiler');
const descriptorToString = require('vue-sfc-descriptor-to-string');

module.exports = adapt;

function adapt(transform) {
  return function newTransform(fileInfo, api, options) {
    const fullSource = fileInfo.source;

    const sfcDescriptor = compiler.parseComponent(fullSource);
    const scriptBlock = sfcDescriptor.script;

    const script = scriptBlock.content;
    fileInfo.source = script;

    const result = transform(fileInfo, api, options);

    if (result === undefined) {
      return undefined;
    } else {
      scriptBlock.content = result;
      return descriptorToString(sfcDescriptor);
    }
  };
}
