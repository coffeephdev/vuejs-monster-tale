<template lang="pug">
div(class="content" :style="{ '--bg-img': `url(${MenuImg})` }")
  h1 Choisissez une histoire
  book-button(title="Halloween" @click="handleBookChoice('halloween')")

</template>

<script setup lang="ts">
import router from '@/router/index'
import bookButton from './bookButton.vue'
import BookButton from './bookButton.vue'
import MenuImg from "@/assets//monster-tale-menu.png"

const handleBookChoice = (book: string) => {
  router.push(`books/${book}`)
}
</script>

<style lang="scss">
.content {
  background: no-repeat var(--bg-img);
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
