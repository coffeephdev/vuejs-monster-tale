<template lang="pug">
div( class="content")
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DialogueManager from '@nathanhoad/saywhat'
import DialogueResource from '../../assets/halloween/halloween.json'

const line = ref()

onMounted(async () => {
  line.value = await DialogueManager.getNextDialogueLine(
    DialogueResource.titles['01 Start'],
    DialogueResource
  )
}),
  console.log(line)
DialogueManager.getNextDialogueLine(line.nextId, DialogueResource)
</script>

<style scoped lang="scss">
.content {
  background: no-repeat url(../../assets/img/monster-tale-menu.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
