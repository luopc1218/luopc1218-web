import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import PlayerDemoPage from '@/pages/playerDemo/PlayerDemoPage.vue'


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
  },
  {
    path: '/playerDemo',
    name: 'playerDemo',
    component: PlayerDemoPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
