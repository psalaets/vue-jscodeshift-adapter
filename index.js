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
    fileInfo.script = createOutputBlock('script', script);
    fileInfo.template = createOutputBlock('template', $('template').html());
    fileInfo.style = createOutputBlock('style', style);

    let newScriptContent = transform(fileInfo, api, options);

    if (fileInfo.script.contentChanged) {
      newScriptContent = fileInfo.script.content;
    }

    if (!newScriptContent) {
      return undefined;
    } else {
      scriptBlock.content = newScriptContent;
      return descriptorToString(sfcDescriptor);
    }
  };
}

function createOutputBlock(type, content, attributes = {}) {
  let _contentChanged = false;
  let _content = content;

  return {
    type,
    attributes,
    get contentChanged() {
      return _contentChanged;
    },
    get content() {
      return _content;
    },
    set content(c) {
      _contentChanged = true;
      _content = c;
    }
  };
}
