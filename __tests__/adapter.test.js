const adapter = require('../index.js');

const template = `
  <div class="widget">{{name}}</div>
`;

const script = `
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
`;

const style = `
.widget {
  color: red;
}
`;

const sfc = (template, script, style) => {
  const templateBlock = `<template>${template}</template>`;
  const scriptBlock = `<script>${script}</script>`;
  const styleBlock = `<style>${style}</style>`;

  return `
${templateBlock}

${scriptBlock}

${styleBlock}
`;
};


test('passes component code as fileInfo.source', () => {
  let source = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    source = fileInfo.source;
  });

  adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(source).toBe(script);
});

test('returns transform\'s undefined return value', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return undefined;
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe(undefined);
});

test('returns transform\'s string return value with the other sfc pieces', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return 'const a = 4;';
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe(sfc(template, 'const a = 4;', style));
});
