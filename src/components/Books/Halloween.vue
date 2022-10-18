<template lang="pug">
div( class="content" :style="backgroundClass")
  div(class="dialogue")
    p(v-if="line") {{line.dialogue}}
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DialogueManager from '@nathanhoad/saywhat'
import DialogueResource from '../../assets/halloween/halloween.json'

const imgPath = 'https://www.givr.fr/monster-tale-images/halloween'

const line = ref()
const backgroundSelected = ref('intro')

const backgroundClass = computed(
  () => `background-image: url(${imgPath}/backgrounds/${backgroundSelected.value}.png)`
)
console.log(backgroundClass.value)

onMounted(async () => {
  line.value = await DialogueManager.getNextDialogueLine(
    DialogueResource.titles['01 Start'],
    DialogueResource
  )
  console.log(line.value.dialogue)
})

DialogueManager.getNextDialogueLine(line.nextId, DialogueResource)
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  position: relative;
}
.dialogue {
  float: bottom;
}
</style>
