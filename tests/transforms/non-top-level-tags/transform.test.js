const { testTransform } = require('../test-helper');
const transform = require('./transform');

const input = `
<template>
  <div class="widget">
    <template>
      <div>1</div>
      <div>2</div>
    </template>
    <script>var a = 1;</script>
    <style>.widget {background-color: green;}</style>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
.widget {
  color: red;
}
</style>
`;

const output = `
<template>
  <span>
    <!-- this is new -->
    asdf
  </span>
</template>

<script>
// this is new
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style>
/* this is new too */
.widget {
  color: red;
}
</style>
`;

testTransform(transform, 'Widget.vue', input, output);