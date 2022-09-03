<template lang="pug">
div(class="content")
  book-button(title="Halloween")

</template>

<script setup lang="ts">
import router from '@/router/index'
import bookButton from './bookButton.vue'
import BookButton from './bookButton.vue'

const handleBookChoice = (book: string) => {
  router.push(`book/${book}`)
}
</script>

<style lang="scss">
.content {
  background: no-repeat url(../../assets/img/monster-tale-menu.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  #enter-button {
    position: absolute;
    bottom: 5vw;
  }
}
</style>
