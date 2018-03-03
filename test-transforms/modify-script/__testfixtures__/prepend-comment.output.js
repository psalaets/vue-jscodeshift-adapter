<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script>
// this is the comment
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
