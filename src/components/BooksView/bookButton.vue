<template lang="pug">
button(class="button") {{title}}
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<style lang="scss">
.button {
  width: 20vw;
  height: 5vw;
  border-width: 1px;
  font-size: 2vw;
}
</style>
