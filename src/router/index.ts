import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import IndexPage from '../pages/index/IndexPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
