import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import TheBookReader from '../components/Books/TheBookReader.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/books/:book',
      component: TheBookReader,
      props: true,
    },
    {
      path: '/books',
      component: BooksView,
    },
  ],
})

export default router
