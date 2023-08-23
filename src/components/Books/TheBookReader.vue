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
      left: 2vw;
      top: -1.8vw;
      display: flex;
      flex-direction: column;
      font-size: 2.1vw;
      background-color: #5f3a74;
      border-radius: 5vw;
      padding: 0 0.8vw;
      margin-left: 2vw;
    }

    .dialogue {
      font-size: 2vw;
      width: 60%;
      display: flex;
      margin-top: 2vh;

      &.narrator {
        color: var(--narrator);
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
      transition: opacity background-color 0.3s;
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
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: 7vw;

      .response {
        font-family: var(--font-text);
        border: none;
        font-size: 1.8vw;
        height: 3vw;
        width: max-content;
        text-align: center;
        cursor: pointer;
        background-color: var(--background);
        border-radius: 50vw;
        padding: 0 1.5vw;
        margin: 0.4vw;
        margin-top: 0;
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
