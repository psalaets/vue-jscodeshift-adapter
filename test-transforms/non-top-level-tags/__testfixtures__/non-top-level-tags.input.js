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
