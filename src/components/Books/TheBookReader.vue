<template lang="pug">
Book
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed, ref } from 'vue'

const props = defineProps({
  book: String,
})

const capitalizedBook = computed(() => {
  return props.book!.charAt(0).toUpperCase() + props.book!.slice(1)
})

const Book = defineAsyncComponent(() => import(`../Books/${capitalizedBook.value}.vue`))
</script>

<style lang="scss">
.book-content {
  display: flex;
  justify-content: center;
  position: relative;
  background-size: contain;
  background-repeat: no-repeat;

  .occluder {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .character-gif {
    opacity: 0;
  }

  .dialogue-wrapper {
    border: 1px white solid;
    border-radius: 0.6vw;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 11vw;
    background-color: #151124e1;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    z-index: 10;

    .character-name {
      position: absolute;
      left: 3vw;
      top: -1.8vw;
      display: flex;
      flex-direction: column;
      font-size: 1.8vw;
      background-color: #151124;
      border: var(--light) solid 1px;
      border-radius: 5vw;
      padding: 0 0.8vw;
      margin-left: 2vw;
    }

    .dialogue {
      font-size: 2vw;
      width: 80%;
      display: flex;
      justify-content: center;
      > p {
        margin: 1vw;
      }
    }

    .next-dialogue-button {
      border: none;
      background-color: var(--background-over);
      color: white;
      border-radius: 10px;
      font-size: 4vw;
      margin: 2.5vw -1vw;
      height: 5.5vw;
      width: 5vw;
      position: absolute;
      right: 2vw;
      &:hover {
        background-color: var(--light);
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
        filter: brightness(0.5);
      }
    }

    .response-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .response {
        font-family: var(--font-text);
        border: none;
        font-size: 1.8vw;
        width: max-content;
        text-align: center;
        cursor: pointer;
        background-color: var(--background);
        border-radius: 50vw;
        padding: 0 1.5vw;
        margin-bottom: 0.4vw;
        &:hover {
          background-color: var(--light);
          position: relative;
          &::before {
            position: absolute;
            left: 0.1vw;
            font-size: 1.5vw;
            content: '☛  ';
          }
          &::after {
            position: absolute;
            right: 0.1vw;
            font-size: 1.5vw;
            content: '  ☚';
          }
        }
      }
    }
  }
}
</style>
