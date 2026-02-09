<template lang="pug">
div(class="content")
  h1 Choisissez une histoire
  book-button(title="Halloween" @click="handleBookChoice('halloween')")

</template>

<script setup lang="ts">
import router from '@/router/index'
import bookButton from './bookButton.vue'
import BookButton from './bookButton.vue'

const handleBookChoice = (book: string) => {
  router.push(`books/${book}`)
}
</script>

<style lang="scss">
.content {
  background: no-repeat url(src/assets/monster-tale-menu.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h1 {
    font-size: 4vw;
    position: absolute;
    top: 0;
  }
}
</style>
