import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script setup>
  // unchanged
  const asdf = 10;
</script>

<script>
  // this changes
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

<script setup>
  // unchanged
  const asdf = 10;
</script>

<script>
  // this changes
  const bar = 4;
</script>

<style>
.widget {
  color: red;
}
</style>
`;

testTransform(transform, 'Widget.vue', input, output);