import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: "home",
    component: HomePage
  },
  {
    path: '/profile',
    name: "profile",
    component: ProfilePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
