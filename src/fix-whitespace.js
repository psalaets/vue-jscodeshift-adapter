/**
 * NOTE: `vue-sfc-descriptor-to-string` uses `indent-string`, which ignores
 * indenting whitespace-only lines by design.
 *
 * So we're giving them an additional indentation in advance, while we still
 * have all blocks and their respective indentations separate.
 */
export default function fixWhitespace(sfcDescriptor, indents) {
  ['template', 'script', 'scriptSetup'].forEach((blockId) => {
    const block = sfcDescriptor[blockId];
    const indent = indents[blockId];

    if (block) {
      block.content = block.content
        .split('\n')
        .map((line) => (line.match(/^\s+$/) ? line + ' '.repeat(indent) : line))
        .join('\n');
    }
  });
};
