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

test('passes <script> content as fileInfo.script.content', () => {
  let scriptContent = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    scriptContent = fileInfo.script.content;
  });

  adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(scriptContent).toBe(script);
});

test('passes <template> content as fileInfo.template.content', () => {
  let templateContent = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    templateContent = fileInfo.template.content;
  });

  adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(templateContent).toBe(template);
});

test('passes component path as fileInfo.path', () => {
  let path = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    path = fileInfo.path;
  });

  adapted({
    path: '/the/path',
    source: sfc(template, script, style)
  }, {}, {});

  expect(path).toBe('/the/path');
});


test('passes api to transform', () => {
  const apiPassed = {
    jscodeshift: () => { },
    stats: () => { }
  };
  let apiSeen = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    apiSeen = api;
  });

  adapted({
    source: sfc(template, script, style)
  }, apiPassed, {});

  expect(apiSeen.jscodeshift).toBe(apiPassed.jscodeshift);
  expect(apiSeen.stats).toBe(apiPassed.stats);
});

test('passes options to transform', () => {
  const optionsPassed = {
    blah: 1
  };
  let optionsSeen = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    optionsSeen = options;
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, optionsPassed);

  expect(optionsSeen.blah).toBe(optionsPassed.blah);
});

test('returns undefined if transform returns undefined', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return undefined;
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe(undefined);
});

test('returns null if transform returns null', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return null;
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe(null);
});

test('returns empty string if transform returns empty string', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return '';
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe('');
});

test('returns sfc with new script if transform returns different string', () => {
  const adapted = adapter(function transform(fileInfo, api, options) {
    return 'const a = 4;';
  });

  const result = adapted({
    source: sfc(template, script, style)
  }, {}, {});

  expect(result).toBe(sfc(template, 'const a = 4;', style));
});
