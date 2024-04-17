import { parse } from '@vue/compiler-sfc';

/**
 * @typedef {object} Indents
 * @property {number} [template]
 * @property {number} [scriptSetup]
 * @property {number} [script]
 * @property {number} [styles]
 *
 * @typedef {object} ParseResult
 * @property {import('@vue/compiler-sfc').SFCDescriptor} sfcDescriptor
 * @property {Indents} indents
 */

/**
 * @param {string} source
 * @return {ParseResult}
 */
export function parseSfc(source) {
  const { descriptor } = parse(source);

  const indents = {}
  if (descriptor.template) {
    indents.template = detectIndent(descriptor.template, source);
  }

  if (descriptor.scriptSetup) {
    indents.scriptSetup = detectIndent(descriptor.scriptSetup, source);
  }

  if (descriptor.script) {
    indents.script = detectIndent(descriptor.script, source);
  }

  if (descriptor.styles.length > 0)  {
    indents.style = detectIndent(descriptor.styles[0], source);
  }

  return { sfcDescriptor: descriptor, indents };
};

/**
 * @param {import('@vue/compiler-sfc').SFCBlock} sfcBlock
 */
function detectIndent(sfcBlock, source) {
  const nonEmptyPaddingsPerLine = source.substring(sfcBlock.loc.start.offset, sfcBlock.loc.end.offset)
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
