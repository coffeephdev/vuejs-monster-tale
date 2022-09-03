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
  border-width: 0.2vw;
}
</style>
