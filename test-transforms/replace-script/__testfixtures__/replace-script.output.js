<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number
    }
  }
};
</script>

<style>
.widget {
  color: red;
}
</style>
