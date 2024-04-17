import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script setup>
  const foo = 5;
</script>

<style>
.widget {
  color: red;
}
</style>
`;

const output = `
<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script setup>
  const bar = 5;
</script>

<style>
.widget {
  color: red;
}
</style>
`;

testTransform(transform, 'Widget.vue', input, output);