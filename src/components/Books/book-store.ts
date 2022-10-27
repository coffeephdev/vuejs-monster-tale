import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookStore = defineStore('book', () => {
  const backgrounds = ref(['intro'])
  return { backgrounds }
})
