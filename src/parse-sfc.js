const compiler = require('vue-template-compiler');

module.exports = function parse(source) {
  const sfcDescriptor = compiler.parseComponent(source);

  const indents = {}
  if (sfcDescriptor.template) {
    indents.template = detectIndent(sfcDescriptor.template, source);
  }

  if (sfcDescriptor.script) {
    indents.script = detectIndent(sfcDescriptor.script, source);
  }

  if (sfcDescriptor.styles.length > 0)  {
    indents.style = detectIndent(sfcDescriptor.styles[0], source);
  }

  return { sfcDescriptor, indents };
};

function detectIndent(sfcBlock, source) {
  const nonEmptyPaddingsPerLine = source.substring(sfcBlock.start, sfcBlock.end)
    .split('\n')
    .filter(line => !line.match(/^\s*$/))
    .map(getLinePadding);

  if (nonEmptyPaddingsPerLine.length === 0) {
    return 0;
  }
  return Math.min(...nonEmptyPaddingsPerLine)
}

function getLinePadding(line) {
  const spacesMatch = line.match(/^ +/);
  if (!spacesMatch) {
    return 0;
  }
  return spacesMatch[0].length;
}