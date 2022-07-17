<template lang="pug">
button
  slot
    p Ok
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style scoped lang="scss">
button {
  font-size: 3.5vw;
  height: 6vw;
  width: 14vw;
  border-radius: 1vw;
  border: 0.2vw solid var(--c-white);
  color: var(--c-white);
  background-color: var(--c-primary);
  transition: color 0.3s, background 0.3s;
  cursor: pointer;
  &:hover {
    color: var(--c-primary);
    background-color: var(--c-white);
  }
}
</style>
