const parseSfc = require('./parse-sfc');

module.exports = adapt;

function adapt(transform, settings) {
  return function newTransform(fileInfo, api, options) {
    if (!fileInfo.path.endsWith('.vue')) {
      throw new Error(`vueOnly mode can only process vue files but received: ${fileInfo.path}`);
    }

    const newFileInfo = {
      path: fileInfo.path
    };

    const sfcDescriptor = parseSfc(fileInfo.source);

    const templateBlock = sfcDescriptor.template;
    if (templateBlock) {
      const template = templateBlock.content;
      newFileInfo.template = createOutputBlock('template', template);
    }

    const scriptBlock = sfcDescriptor.script;
    if (scriptBlock) {
      const script = scriptBlock.content;
      newFileInfo.script = createOutputBlock('script', script);
    }

    const styleBlock = sfcDescriptor.styles[0];
    if (styleBlock) {
      const style = styleBlock.content;
      newFileInfo.style = createOutputBlock('style', style);
    }

    transform(newFileInfo, api, options);

    const hasChanges = [
      newFileInfo.script,
      newFileInfo.template,
      newFileInfo.style
    ]
      .filter(block => !!block)
      .some(block => block.contentChanged);

    if (hasChanges) {
      templateBlock.content = newFileInfo.template.content;
      scriptBlock.content = newFileInfo.script.content;
      styleBlock.content = newFileInfo.style.content;

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
