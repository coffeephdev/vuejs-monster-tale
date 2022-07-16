<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template lang="pug">
.main-wrapper
  
  RouterView(class="main-container")
</template>

<style scoped>
.main-container {
  width: 70vw;
  height: calc(70vw / 16 * 9);
  border-radius: 1em;
  box-shadow: 5px 2px 15px 0 black;

  font-weight: normal;
}
.main-wrapper {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
