import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksView from '../views/BooksView.vue'
import Halloween from '../components/Books/Halloween.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/book/halloween',
      name: 'halloween',
      component: Halloween,
      // component: () => import('../components/BooksView/Halloween.vue'),
    },
  ],
})

export default router
