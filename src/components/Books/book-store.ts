import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const chars = ref<(StoryItem | undefined)[]>([])
  const items = ref<(StoryItem | undefined)[]>([])
  const backgrounds = ref(['intro'])
  const transitionDelay = 0.5
  const audioVolume = 0.07

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

  return { backgrounds, Spawn, Unspawn, chars, items, transitionDelay, audioVolume }
})
