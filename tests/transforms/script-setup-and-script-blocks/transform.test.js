import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script>
  const foo = 1;
</script>

<script setup>
  const foo = 4;
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

<script>
  const bar = 1;
</script>

<script setup>
  const bar = 4;
</script>

<style>
.widget {
  color: red;
}
</style>
`;

testTransform(transform, 'Widget.vue', input, output);