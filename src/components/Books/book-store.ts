import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const chars = ref<(Char | undefined)[]>([])
  const backgrounds = ref(['intro'])
  const transitionDelay = 0.5
  const audioVolume = 0.07

  return { backgrounds, chars, transitionDelay, audioVolume }
})
