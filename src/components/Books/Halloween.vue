<template>
  <div class="book-content" :style="backgroundClass">
    <div class="dialogue-wrapper">
      <div class="dialogue">
        <p v-if="line">{{ currentDialogue }}</p>
      </div>
      <div class="response-wrapper" v-if="hasReponses">
        <button
          class="response"
          v-for="reponse in line.responses"
          @click="nextDialogue(reponse.nextId)"
        >
          {{ reponse.prompt }}
        </button>
      </div>

      <button class="next-dialogue-button" v-if="hasNextDialogue" @click="nextDialogue()">☞</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import DialogueManager from '@nathanhoad/saywhat'
import DialogueResource from '@/assets/halloween/halloween.json'
import { useBookStore } from './book-store'

DialogueManager.gameStates = [
  {
    change_backgrounds(names: string) {
      store.backgrounds = names.split(' ')
    },
  },
]

const store = useBookStore()

const imgPath = 'https://www.givr.fr/monster-tale-images/halloween'

const line = ref()

const backgroundClass = computed(() => {
  let result = 'background-image:  '
  store.backgrounds.forEach((image, index) => {
    result += `url(${imgPath}/backgrounds/${image}.png)`
    if (index != store.backgrounds.length - 1) {
      result += ', '
    }
  })
  console.log(result)

  return result
})

onMounted(async () => {
  line.value = await DialogueManager.getNextDialogueLine(
    DialogueResource.titles['01 Start'],
    DialogueResource
  )
})

const hasNextDialogue = computed(() => {
  return line.value && line.value.nextId && !hasReponses.value
})

const responses = computed(() => {
  return line.value && line.value.responses.length != 0
})

const hasReponses = computed(() => {
  return line.value && line.value.responses.length != 0
})

const currentDialogue = computed(() => {
  return line.value.dialogue
})

async function nextDialogue(reponseNextId?: number) {
  const next_id = reponseNextId ? reponseNextId : line.value.nextId
  line.value = await DialogueManager.getNextDialogueLine(next_id, DialogueResource)
}
</script>
