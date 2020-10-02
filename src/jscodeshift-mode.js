const descriptorToString = require('vue-sfc-descriptor-to-string');
const parseSfc = require('./parse-sfc');

module.exports = adapt;

function adapt(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      return transform(fileInfo, api, options);
    }

    const { sfcDescriptor, indents } = parseSfc(fileInfo.source);
    const scriptBlock = sfcDescriptor.script;

    if (scriptBlock) {
      fileInfo.source = scriptBlock.content;

      const newScriptContent = transform(fileInfo, api, options);
      if (!!newScriptContent) {
        scriptBlock.content = newScriptContent;

        return descriptorToString(sfcDescriptor, {
          indents
        });
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };
}

