const compiler = require('vue-template-compiler');

module.exports = adapt;

function adapt(transform) {
  return function newTransform(fileInfo, api, options) {
    const fullSource = fileInfo.source;
    const sfcDescriptor = compiler.parseComponent(fullSource);

    const scriptBlock = sfcDescriptor.script;

    const script = sfcDescriptor.script.content;
    const template = sfcDescriptor.template.content;
    const styles = sfcDescriptor.styles;

    fileInfo.source = script;

    const result = transform(fileInfo, api, options);

    if (result === undefined) {
      return undefined;
    } else {
      let before = fullSource
    }

    return `
<template>${indent(2, template)}</template>

<script>${result}</script>

<style>${styles[0].content}</style>
`;

    return result;
  };
}

function indent(spaces, code) {
  return code
    .split(/\n/)
    .map(line => line ? `${' '.repeat(spaces)}${line}` : '')
    .join('\n');
}