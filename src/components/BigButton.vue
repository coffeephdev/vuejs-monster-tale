<template lang="pug">
button
  slot
    p Ok
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup(props) {},
})
</script>

<style scoped lang="scss">
button {
  font-size: 3.5vw;
}
</style>
