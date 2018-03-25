const descriptorToString = require('vue-sfc-descriptor-to-string');
const parseSfc = require('./parse-sfc');

module.exports = adapt;

function adapt(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      throw new Error(`vueOnly mode can only process vue files but received: ${fileInfo.path}`);
    }

    const vueFileInfo = {
      path: fileInfo.path
    };

    const sfcDescriptor = parseSfc(fileInfo.source);

    const templateBlock = sfcDescriptor.template;
    if (templateBlock) {
      const template = templateBlock.content;
      vueFileInfo.template = createOutputBlock('template', template);
    }

    const scriptBlock = sfcDescriptor.script;
    if (scriptBlock) {
      const script = scriptBlock.content;
      vueFileInfo.script = createOutputBlock('script', script);
    }

    const styleBlock = sfcDescriptor.styles[0];
    if (styleBlock) {
      const style = styleBlock.content;
      vueFileInfo.style = createOutputBlock('style', style);
    }

    const transformedFileInfo = transform(vueFileInfo, api, options);

    const hasChanges = [
      vueFileInfo.script,
      vueFileInfo.template,
      vueFileInfo.style
    ]
      .filter(block => !!block)
      .some(block => block.contentChanged);

    if (hasChanges) {
      templateBlock.content = vueFileInfo.template.content;
      scriptBlock.content = vueFileInfo.script.content;
      styleBlock.content = vueFileInfo.style.content;

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

function createOutputBlock(type, content) {
  let _contentChanged = false;
  let _content = content;

  return {
    type,
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
