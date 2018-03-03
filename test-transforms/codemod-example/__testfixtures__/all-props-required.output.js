<template>
  <div class="widget">
    Hello {{name}}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    }
  },
  computed: {
    hasName() {
      return !!this.name;
    }
  }
};
</script>

<style>
.widget {
  color: red;
}
</style>
