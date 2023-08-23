import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const chars = ref<(StoryItem | undefined)[]>([])
  const items = ref<(StoryItem | undefined)[]>([])
  const backgrounds = ref(['intro'])
  const transitionDelay = 0.5
  const audioVolume = 0.07
  const currentDialogue = ref<null | string>(null)

  function Spawn(param: string, pool: (StoryItem | undefined)[]) {
    const args = param.split(' ')
    const newItem: StoryItem = {
      name: args[0],
      posX: parseInt(args[1]),
      posY: parseInt(args[2]),
      size: parseFloat(args[3]),
      opacity: 0,
    }

    const length = pool.push(newItem)
    setTimeout(() => {
      pool[length - 1]!.opacity = 1
    }, 1)
  }

  function Unspawn(name: string, pool: (StoryItem | undefined)[]) {
    const item = pool.find((x) => x?.name === name)
    if (item) {
      item.opacity = 0
      setTimeout(() => {
        const index = pool.findIndex((x) => x?.name === item.name)
        if (index != -1) {
          pool[index] = undefined
        }
      }, transitionDelay * 1000)
    }
  }

  function printDialogue() {
    if (currentDialogue.value == null) return

    const initialDialogue = currentDialogue.value
    // virer ça et append les char plutôt
    currentDialogue.value = ' '.repeat(initialDialogue.length)
    let indice = 0
    let feedWord: undefined | number
    if (!feedWord) {
      feedWord = setInterval(() => {
        // 3 par 3 pour fluidifier le spawn de char
        for (let k = 3; k > 0; k--) {
          currentDialogue.value = setCharAt(currentDialogue.value, indice, initialDialogue[indice])
          indice = indice + 1
        }

        if (indice >= initialDialogue.length) {
          clearInterval(feedWord)
        }
      }, 15)
    }
  }

  function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str
    return str.substring(0, index) + chr + str.substring(index + 1)
  }

  return {
    currentDialogue,
    backgrounds,
    Spawn,
    Unspawn,
    printDialogue,
    chars,
    items,
    transitionDelay,
    audioVolume,
  }
})
