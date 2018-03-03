const compiler = require('vue-template-compiler');
const descriptorToString = require('vue-sfc-descriptor-to-string');

module.exports = adapt;

function adapt(transform) {
  return function newTransform(fileInfo, api, options) {
    const sfcDescriptor = compiler.parseComponent(fileInfo.source);
    const scriptBlock = sfcDescriptor.script;
    const script = scriptBlock.content;

    fileInfo.source = script;
    fileInfo.script = {
      content: script
    };

    const result = transform(fileInfo, api, options);

    if (!result) {
      return result;
    } else {
      scriptBlock.content = result;
      return descriptorToString(sfcDescriptor);
    }
  };
}
