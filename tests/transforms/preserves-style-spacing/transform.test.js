import { testTransform } from '../test-helper.js';
import transform from './transform.js';

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