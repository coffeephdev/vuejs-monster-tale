<template lang="pug">
.welcome
  BigButton(id="enter-button" @click="handleClick") Entrer
  .credits
    p 📜 Givr_
    p 🎨 Jane Prigent
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BigButton from './BigButton.vue'
import router from '../../router/index'

export default defineComponent({
  setup() {
    const handleClick = () => {
      router.push('books')
    }
    return { handleClick }
  },
  components: { BigButton },
})
</script>

<style scoped lang="scss">
.welcome {
  background: no-repeat url(src\assets\title-screen.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  #enter-button {
    position: absolute;
    bottom: 5vw;
  }

  .credits{
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: .5vw;
    width: 50%;
    > * {
      background-color: var(--background);
      color: white;
      text-decoration: none;
      border-radius: 50vw;
      padding: 0 1vw;
      opacity: .5;
      font-size: 1vw;
      transition: opacity .2s;
      &:hover{
        opacity: 1;
      }
    }
  }
}
</style>
