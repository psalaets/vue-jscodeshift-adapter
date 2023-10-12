const descriptorToString = require('vue-sfc-descriptor-to-string');

const parseSfc = require('./parse-sfc');
const fixWhitespace = require('./fix-whitespace');

module.exports = adapt;

function adapt(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      return transform(fileInfo, api, options);
    }

    const { sfcDescriptor, indents } = parseSfc(fileInfo.source);

    fixWhitespace(sfcDescriptor, indents);

    const scriptBlock = sfcDescriptor.script;

    if (scriptBlock) {
      const newScriptContent = transform(
        Object.assign({}, fileInfo, {
          source: scriptBlock.content,
        }),
        api,
        options
      );

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
