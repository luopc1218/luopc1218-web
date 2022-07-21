import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BbsPage from '@/pages/bbs/BbsPage.vue'
import BbsIndexPage from '@/pages/bbs/index/BbsIndexPage.vue'
import BlogPage from '@/pages/blog/BlogPage.vue'

import ProfilePage from '@/pages/profile/ProfilePage.vue'
import IndexPage from '@/pages/index.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/bbs',
    name: "bbs",
    component: BbsPage,
    children: [
      {
        path: '',
        name: 'bbsIndex',
        component: BbsIndexPage
      }
    ]
  },
  {
    path: '/blog',
    name: "blogHome",
    component: BlogPage,

  },
  {
    path: '/profile',
    name: "profile",
    component: ProfilePage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
