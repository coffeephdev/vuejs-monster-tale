import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const chars = ref<(Char | undefined)[]>([])
  const backgrounds = ref(['intro'])
  const spawnCharDelay = 0.5

  return { backgrounds, chars, spawnCharDelay: spawnCharDelay }
})
