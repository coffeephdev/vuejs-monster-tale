<template>
  <div class="book-content" :style="backgroundClass">
    <template v-for="char in store.chars">
      <img
        class="character-gif"
        :src="getCharSrc(char.name)"
        :style="getCharStyle(char)"
        alt="Character"
    /></template>
    <div class="dialogue-wrapper">
      <div class="character-name" v-if="characterName">{{ characterName }}</div>
      <div class="dialogue">
        <p v-if="line">{{ currentDialogue }}</p>
      </div>
      <div class="response-wrapper" v-if="hasReponses">
        <button
          class="response"
          v-for="response in responses"
          @click="nextDialogue(response.nextId)"
        >
          {{ response.prompt }}
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

    spawn_char(param: string) {
      const args = param.split(' ')

      const length = store.chars.push({
        name: args[0],
        posX: parseInt(args[1]),
        posY: parseInt(args[2]),
        size: parseFloat(args[3]),
        opacity: 0,
      })
      const timer = setTimeout(() => {
        store.chars[length - 1]!.opacity = 1
        clearInterval(timer)
      }, 1)
    },

    remove_char(name: string) {
      const char = store.chars.find((item) => item?.name === name)

      if (char) {
        char.opacity = 0

        const timer = setTimeout(() => {
          let item = store.chars.find((item) => item?.name === char.name)
          item = undefined

          clearInterval(timer)
        }, store.spawnDelay * 1000)
      }
    },
  },
]

const store = useBookStore()

const imgPath = 'https://www.givr.fr/monster-tale-images/halloween'

const line = ref()

const backgroundClass = computed(() => {
  let result = 'background-image: '
  store.backgrounds.forEach((image, index) => {
    result += `url(${imgPath}/backgrounds/${image}.png)`
    if (index != store.backgrounds.length - 1) {
      result += ', '
    }
  })
  return result
})

onMounted(async () => {
  line.value = await DialogueManager.getNextDialogueLine(
    DialogueResource.titles['01 Start'],
    DialogueResource
  )
})
const characterName = computed<string | undefined>(() => {
  return line.value?.character ?? undefined
})

const hasNextDialogue = computed<boolean>(() => {
  return (line.value?.nextId && !hasReponses.value) ?? false
})

const responses = computed<any[]>(() => {
  return line.value?.responses ?? []
})

const hasReponses = computed<boolean>(() => {
  return line.value?.responses.length != 0 ?? false
})

const currentDialogue = computed<string | undefined>(() => {
  return line.value?.dialogue ?? undefined
})

async function nextDialogue(reponseNextId?: number) {
  const next_id = reponseNextId ? reponseNextId : line.value.nextId
  line.value = await DialogueManager.getNextDialogueLine(next_id, DialogueResource)
}

function getCharSrc(name: string) {
  return `${imgPath}/animations/${name}.gif`
}

function getCharStyle(char: Char) {
  let result = `position:absolute;`
  result += `height:${char.size * 100}%;`
  result += `top:${char.posY}%;`
  result += `left:${char.posX}%;`
  result += `opacity:${char.opacity};`
  result += `transition: opacity ${store.spawnDelay}s;`
  return result
}
</script>
