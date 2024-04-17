import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <div />
</template>
<script>
  const foo = 4;
  if (foo === 4) {
      console.log('yes');
  }
</script>
`;

const output = `
<template>
  <div />
</template>
<script>
  const bar = 4;
  if (bar === 4) {
      console.log('yes');
  }
</script>
`;

testTransform(transform, 'Widget.vue', input, output);