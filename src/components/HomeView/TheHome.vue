<template lang="pug">
.welcome
  BigButton(id="enter-button" @click="handleClick") Entrer
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

<style lang="scss">
.welcome {
  background: no-repeat url(../../assets/img/monster-tale.png);
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
