<template>
  <div class="book-content" :style="backgroundClass">
    <div class="occluder" :style="`opacity:${occluderOpacity}`" />
    <div class="dialogue-wrapper">
      <div class="character-name" v-if="characterName">{{ characterName }}</div>
      <div class="dialogue" :class="{ narrator: isNarrator }">
        <p v-if="line">{{ `${store.currentDialogue}` }}</p>
      </div>
      <div class="response-wrapper" v-if="hasReponses">
        <button
          class="response"
          v-for="response in responses"
          @click="(e) => nextDialogue(e, response.nextId)"
        >
          {{ response.prompt }}
        </button>
      </div>
      <button
        class="next-dialogue-button"
        v-if="hasNextDialogue"
        @click="(e) => nextDialogue(e)"
        :disabled="disableClick"
      >
        ☞
      </button>
    </div>
    <template v-for="item in store.items">
      <img
        v-if="item"
        class="character-gif"
        :src="getItemSrc(item.name)"
        :style="getStoryItemStyle(item)"
        :alt="item.name"
      />
    </template>
    <template v-for="char in store.chars">
      <img
        v-if="char"
        class="character-gif"
        :src="getCharSrc(char.name)"
        :style="getStoryItemStyle(char)"
        :alt="char.name + 'Character'"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import DialogueManager from '@nathanhoad/saywhat'
import DialogueResource from '@/assets/halloween/halloween.json'
import { useBookStore } from './book-store'
const store = useBookStore()

const disableClick = ref(false)

DialogueManager.gameStates = [
  {
    hasDrinkTea: false,
    hasCheckCauldron: false,
    hasReadRecipy: false,

    toggle_state(param: string) {
      this[param] = !this[param]
    },
    change_backgrounds(names: string) {
      occluderOpacity.value = 1
      setTimeout(() => {
        occluderOpacity.value = 0
        store.backgrounds = names.split(' ')
      }, store.transitionDelay * 1000)
    },

    spawn_char(param: string) {
      store.Spawn(param, store.chars)
    },

    spawn_item(param: string) {
      store.Spawn(param, store.items)
    },

    remove_char(name: string) {
      store.Unspawn(name, store.chars)
    },

    remove_item(name: string) {
      store.Unspawn(name, store.items)
    },
  },
]

const dataPath = 'https://www.givr.fr/monster-tale-images/halloween'
const line = ref()
const audioClickFeedback = new Audio(`${dataPath}/audio/click.mp3`)
const audioBackground = new Audio(`${dataPath}/audio/TipToes - Myuu.mp3`)

const backgroundClass = computed(() => {
  let result = 'background-image: '
  store.backgrounds.forEach((image, index) => {
    result += `url(${dataPath}/backgrounds/${image})`
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
  store.currentDialogue = line.value?.dialogue ?? null
  store.printDialogue()

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

const isNarrator = computed(() => {
  return !line.value?.character
})

async function nextDialogue(e: Event, reponseNextId?: number) {
  const next_id = reponseNextId ? reponseNextId : line.value.nextId
  line.value = await DialogueManager.getNextDialogueLine(next_id, DialogueResource)
  store.currentDialogue = line.value?.dialogue ?? null
  store.printDialogue()

  // Allow skip transition if user press ctrl
  if (!e.ctrlKey) {
    disableClick.value = true
    audioClickFeedback.currentTime = 0
    audioClickFeedback.play()

    setTimeout(() => {
      disableClick.value = false
    }, store.transitionDelay * 1000)
  }
}

function getCharSrc(name: string) {
  return `${dataPath}/characters/${name}`
}

function getItemSrc(name: string) {
  return `${dataPath}/items/${name}`
}

function getStoryItemStyle(storyItem: StoryItem) {
  let result = `position:absolute;`
  result += `height:${storyItem.size * 100}%;`
  result += `top:${storyItem.posY}%;`
  result += `left:${storyItem.posX}%;`
  result += `opacity:${storyItem.opacity};`
  result += `transition: opacity ${store.transitionDelay}s;`
  return result
}
</script>
