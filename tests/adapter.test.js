const adapter = require('../src/index');

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

describe('vue only mode', () => {
  const settings = {
    vueOnly: true
  };

  test('passes <script> content as fileInfo.script.content', () => {
    let scriptContent = null;
    const adapted = adapter(function transform(fileInfo, api, options) {
      scriptContent = fileInfo.script.content;
    }, settings);

    adapted({
      source: sfc(template, script, style),
      path: 'Widget.vue'
    }, {}, {});

    expect(scriptContent).toBe(script);
  });

  test('passes <template> content as fileInfo.template.content', () => {
    let templateContent = null;
    const adapted = adapter(function transform(fileInfo, api, options) {
      templateContent = fileInfo.template.content;
    }, settings);

    adapted({
      source: sfc(template, script, style),
      path: 'Widget.vue'
    }, {}, {});

    expect(templateContent).toBe(template);
  });

  test('passes <style> content as fileInfo.style.content', () => {
    let styleContent = null;
    const adapted = adapter(function transform(fileInfo, api, options) {
      styleContent = fileInfo.style.content;
    }, settings);

    adapted({
      source: sfc(template, script, style),
      path: 'Widget.vue'
    }, {}, {});

    expect(styleContent).toBe(style);
  });

  test('passes component path as fileInfo.path', () => {
    let path = null;
    const adapted = adapter(function transform(fileInfo, api, options) {
      path = fileInfo.path;
    }, settings);

    adapted({
      path: '/the/path/Widget.vue',
      source: sfc(template, script, style)
    }, {}, {});

    expect(path).toBe('/the/path/Widget.vue');
  });

  test('passes api to transform', () => {
    const apiPassed = {
      jscodeshift: () => { },
      stats: () => { }
    };
    let apiSeen = null;
    const adapted = adapter(function transform(fileInfo, api, options) {
      apiSeen = api;
    }, settings);

    adapted({
      source: sfc(template, script, style),
      path: 'Widget.vue'
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
    }, settings);

    const result = adapted({
      source: sfc(template, script, style),
      path: 'Widget.vue'
    }, {}, optionsPassed);

    expect(optionsSeen.blah).toBe(optionsPassed.blah);
  });

  test('throws when it sees a non-vue file', () => {
    const adapted = adapter(function transform(fileInfo, api, options) {
      fileInfo.script.content = 'var a = 4;';
    }, settings);

    expect(() => {
      adapted({
        source: sfc(template, script, style),
        path: 'api.js'
      }, {}, {});
    }).toThrow(Error);
  });

  test.skip('throws when transform writes to fileInfo.source', () => {
    const adapted = adapter(function transform(fileInfo, api, options) {
      fileInfo.source = 'var a = 4;';
    }, settings);

    expect(() => {
      adapted({
        source: sfc(template, script, style),
        path: 'Widget.vue'
      }, {}, {});
    }).toThrow(Error);
  });
});
