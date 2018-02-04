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

const vueComponentSource = `
<template>${template}</template>

<script>${script}</script>

<style>${style}</style>
`;

test('passes component code as fileInfo.source', () => {
  let source = null;
  const adapted = adapter(function transform(fileInfo, api, options) {
    source = fileInfo.source;
  });

  adapted({
    source: vueComponentSource
  }, {}, {});

  expect(source).toBe(script);
});