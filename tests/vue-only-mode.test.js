const adapter = require('../src/index');
const sfc = require('./make-sfc');

const template = `
  <div class="widget">{{name}}</div>
`;

const script = `
export default {
  props: {
    name: String
  }
};
`;

const style = `
.widget {
  color: red;
}
`;

describe.skip('vue only mode', () => {
  const settings = {
    vueOnly: true
  };

  describe('given a non vue file', () => {
    test('throws Error', () => {
      const adapted = adapter(function transform(fileInfo, api, options) {
        fileInfo.script.content = 'var a = 4;';
      }, settings);

      expect(() => {
        adapted({
          source: sfc({ template, script, style }),
          path: 'api.js'
        }, {}, {});
      }).toThrow(Error);
    });
  });

  describe('given a vue file', () => {
    test('passes <script> content as fileInfo.script.content', () => {
      let scriptContent = null;
      const adapted = adapter(function transform(fileInfo, api, options) {
        scriptContent = fileInfo.script.content;
      }, settings);

      adapted({
        source: sfc({ template, script, style }),
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
        source: sfc({ template, script, style }),
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
        source: sfc({ template, script, style }),
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
        source: sfc({ template, script, style })
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
        source: sfc({ template, script, style }),
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
        source: sfc({ template, script, style }),
        path: 'Widget.vue'
      }, {}, optionsPassed);

      expect(optionsSeen.blah).toBe(optionsPassed.blah);
    });

    test('is a no-op when transform returns nothing', () => {
      const adapted = adapter(function transform(fileInfo, api, options) {
        // no explicit return
      }, settings);

      const result = adapted({
        source: sfc({ template, script, style }),
        path: 'Widget.vue'
      }, {}, {});

      expect(result).toBe(undefined);
    });

    test('returns original source when transform returns same source', () => {
      const adapted = adapter(function transform(fileInfo, api, options) {
        return fileInfo;
      }, settings);

      const result = adapted({
        source: sfc({ template, script, style }),
        path: 'Widget.vue'
      }, {}, {});

      expect(result).toBe(sfc({ template, script, style }));
    });
  });
});
