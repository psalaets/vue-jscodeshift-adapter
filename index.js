const compiler = require('vue-template-compiler');
const descriptorToString = require('vue-sfc-descriptor-to-string');
const cheerio = require('cheerio');

const detectIndent = require('detect-indent');
const indentString = require('indent-string');

module.exports = adapt;

function adapt(transform, settings = {}) {
  const vueOnly = settings.vueOnly || false;

  return function newTransform(fileInfo, api, options) {
    if (vueOnly && !fileInfo.path.endsWith('.vue')) {
      throw new Error(`vueOnly mode can only process vue files but received: ${fileInfo.path}`);
    }

    if (!fileInfo.path.endsWith('.vue')) {
      return transform(fileInfo, api, options);
    }

    const sfcDescriptor = compiler.parseComponent(fileInfo.source);
    const $ = cheerio.load(fileInfo.source);

    // contents of template including outer <template> pair
    const fullTemplate = $.html($('template'));
    const templateIndent = detectIndent(fullTemplate);

    const templateBlock = sfcDescriptor.template;
    const template = indentString(templateBlock.content, templateIndent.count, templateIndent.indent);

    const scriptBlock = sfcDescriptor.script;
    const script = scriptBlock.content;

    const styleBlock = sfcDescriptor.styles[0];
    const style = styleBlock.content;

    fileInfo.source = script;
    fileInfo.script = createOutputBlock('script', script);
    fileInfo.template = createOutputBlock('template', template);
    fileInfo.style = createOutputBlock('style', style);

    let newScriptContent = transform(fileInfo, api, options);

    if (!!newScriptContent) {
      fileInfo.script.content = newScriptContent;
    }

    const hasChanges = [
      fileInfo.script,
      fileInfo.template,
      fileInfo.style
    ].some(b => b.contentChanged);

    if (hasChanges) {
      templateBlock.content = fileInfo.template.content;
      scriptBlock.content = fileInfo.script.content;
      styleBlock.content = fileInfo.style.content;

      return descriptorToString(sfcDescriptor, {
        indents: {
          template: 0
        }
      });
    } else {
      return undefined;
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
