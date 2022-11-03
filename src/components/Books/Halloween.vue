<template>
  <div class="book-content" :style="backgroundClass">
    <div class="occluder" :style="`opacity:${occluderOpacity}`" />
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
      <button
        class="next-dialogue-button"
        v-if="hasNextDialogue"
        @click="nextDialogue()"
        :disabled="disableClick"
      >
        ☞
      </button>
    </div>
    <template v-for="char in store.chars">
      <img
        v-if="char"
        class="character-gif"
        :src="getCharSrc(char.name)"
        :style="getCharStyle(char)"
        alt="Character"
    /></template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import DialogueManager from '@nathanhoad/saywhat'
import DialogueResource from '@/assets/halloween/halloween.json'
import { useBookStore } from './book-store'

const disableClick = ref(false)

DialogueManager.gameStates = [
  {
    change_backgrounds(names: string) {
      occluderOpacity.value = 1
      setTimeout(() => {
        occluderOpacity.value = 0
        store.backgrounds = names.split(' ')
      }, store.transitionDelay * 1000)
    },

    spawn_char(param: string) {
      const args = param.split(' ')
      const newChar = {
        name: args[0],
        posX: parseInt(args[1]),
        posY: parseInt(args[2]),
        size: parseFloat(args[3]),
        opacity: 0,
      }

      const length = store.chars.push(newChar)
      setTimeout(() => {
        store.chars[length - 1]!.opacity = 1
      }, 1)
    },

    remove_char(name: string) {
      const char = store.chars.find((item) => item?.name === name)
      if (char) {
        char.opacity = 0
        setTimeout(() => {
          const index = store.chars.findIndex((item) => item?.name === char.name)
          if (index != -1) {
            store.chars[index] = undefined
          }
        }, store.transitionDelay * 1000)
      }
    },
  },
]

const store = useBookStore()
const dataPath = 'https://www.givr.fr/monster-tale-images/halloween'
const line = ref()
const audioClickFeedback = new Audio(`${dataPath}/audio/click.mp3`)
const audioBackground = new Audio(`${dataPath}/audio/TipToes - Myuu.mp3`)

const backgroundClass = computed(() => {
  let result = 'background-image: '
  store.backgrounds.forEach((image, index) => {
    result += `url(${dataPath}/backgrounds/${image}.png)`
    if (index != store.backgrounds.length - 1) {
      result += ', '
    }
  })
  return result
})
const occluderOpacity = ref(0)

onMounted(async () => {
  store.backgrounds = ['intro']
  line.value = await DialogueManager.getNextDialogueLine(
    DialogueResource.titles['01 Start'],
    DialogueResource
  )
  Array.of(audioBackground, audioClickFeedback).forEach(
    (audio) => (audio.volume = store.audioVolume)
  )
  audioBackground.loop = true
  audioBackground.play()
})

onUnmounted(() => {
  audioBackground.pause()
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
  disableClick.value = true
  audioClickFeedback.currentTime = 0
  audioClickFeedback.play()
  const next_id = reponseNextId ? reponseNextId : line.value.nextId
  line.value = await DialogueManager.getNextDialogueLine(next_id, DialogueResource)

  setTimeout(() => {
    disableClick.value = false
  }, store.transitionDelay * 1000)
}

function getCharSrc(name: string) {
  return `${dataPath}/animations/${name}.gif`
}

function getCharStyle(char: Char) {
  let result = `position:absolute;`
  result += `height:${char.size * 100}%;`
  result += `top:${char.posY}%;`
  result += `left:${char.posX}%;`
  result += `opacity:${char.opacity};`
  result += `transition: opacity ${store.transitionDelay}s;`
  return result
}
</script>
