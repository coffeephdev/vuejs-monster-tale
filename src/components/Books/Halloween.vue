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
        @mousemove="
          (e) => {
            if (e.shiftKey) {
              nextDialogue(e)
            }
          }
        "
        :disabled="disableClick"
      >
        ☞
      </button>
    </div>
    <template v-for="item in store.items">
      <img
        v-if="item"
        class="character-gif"
:src="findImage(item.name)"
        :style="getStoryItemStyle(item)"
        :alt="item.name"
      />
    </template>
    <template v-for="char in store.chars">
      <img
        v-if="char"
        class="character-gif"
:src="findImage(char.name)"
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
const dataPath = '/src/assets/halloween/items'
const images = import.meta.glob('/src/assets/halloween/items/*', { eager: true, as: 'url' })
console.log(images);


const disableClick = ref(false)

DialogueManager.gameStates = [
  {
    hasDrinkTea: false,
    hasMaireIndice: false,
    hasVampireIndice: false,
    foundGarlic: false,
    foundTruth: false,
    hasMeetMaire: false,
    hasMeetVampire: false,

    toggle_state(param: string) {
      this[param] = !this[param]
      console.log('toggle', param)
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

    remove_all_chars() {
      store.Clean(store.chars)
    },

    remove_item(name: string) {
      store.Unspawn(name, store.items)
    },

    has_both_clues() {
      return this.hasMaireIndice && this.hasVampireIndice
    },
  },
]



const findImage = (name: string) => {
  for (const path in images) {
    if (path.includes(`/${name}.`)) {
      return images[path]
    }
  }
  console.warn(`Image not found: ${name}`)
  return ''
}

const line = ref()

const backgroundClass = computed(() => {
  let result = 'background-image: '
  store.backgrounds.forEach((image, index) => {
    const key = `url(${dataPath}/${image}.png)`
    result += key
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
  return line.value?.responses.length != 0
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

    setTimeout(() => {
      disableClick.value = false
    }, store.transitionDelay * 1000)
  }
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
