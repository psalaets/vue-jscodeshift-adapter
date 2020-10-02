const { testTransform } = require('../test-helper');
const transform = require('./transform');

const input = `
<script>
export default {
  name: 'IndentedStyle'
};
</script>

<style>
  .widget {
    color: red;
  }
</style>
`;

const output = `
<script>
export default {};
</script>

<style>
  .widget {
    color: red;
  }
</style>
`;

testTransform(transform, 'Widget.vue', input, output);