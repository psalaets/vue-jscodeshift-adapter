const { testTransform } = require('../test-helper');
const transform = require('./transform');

const input = `
<template>
  <div />
</template>
<script>
  export default {
    name: 'IndentedWithTwoSpaces'
  }
</script>
`;

const output = `
<template>
  <div />
</template>
<script>
  export default {}
</script>
`;

testTransform(transform, 'Widget.vue', input, output);