import { testTransform } from '../test-helper.js';
import transform from './transform.js';

const input = `
<template>
  <h1>This is just a template</h1>
</template>
`;

// jscodeshift test utils represent a no-op transform as empty string
const output = '';

testTransform(transform, 'Widget.vue', input, output);