const compiler = require('vue-template-compiler');
const descriptorToString = require('vue-sfc-descriptor-to-string');
const cheerio = require('cheerio');

module.exports = adapt;

function adapt(transform) {
  return function newTransform(fileInfo, api, options) {
    const sfcDescriptor = compiler.parseComponent(fileInfo.source);
    const $ = cheerio.load(fileInfo.source);

    const scriptBlock = sfcDescriptor.script;
    const script = scriptBlock.content;

    const styleBlock = sfcDescriptor.styles[0];
    const style = styleBlock.content;

    fileInfo.source = script;
    fileInfo.script = {
      content: script
    };
    fileInfo.template = {
      content: $('template').html()
    };
    fileInfo.style = {
      content: style
    }

    const result = transform(fileInfo, api, options);

    if (!result) {
      return result;
    } else {
      scriptBlock.content = result;
      return descriptorToString(sfcDescriptor);
    }
  };
}
