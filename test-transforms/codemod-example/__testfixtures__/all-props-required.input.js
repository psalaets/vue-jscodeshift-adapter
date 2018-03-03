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
      required: false
    },
    age: {
      type: String
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
