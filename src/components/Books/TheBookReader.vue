<template lang="pug">
Book
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'

const props = defineProps({
  book: String,
})

const capitalizedBook = computed(() => {
  return props.book.charAt(0).toUpperCase() + props.book.slice(1)
})

const Book = defineAsyncComponent(() => import(`../Books/${capitalizedBook.value}.vue`))
</script>

<style lang="scss"></style>
