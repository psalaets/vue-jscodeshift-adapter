import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script>
  // unchanged
  const asdf = 2;
</script>

<script setup>
  // this changes
  const foo = 10;
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
  // unchanged
  const asdf = 2;
</script>

<script setup>
  // this changes
  const bar = 10;
</script>

<style>
.widget {
  color: red;
}
</style>
`;

testTransform(transform, 'Widget.vue', input, output);