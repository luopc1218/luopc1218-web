import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BbsPage from '@/pages/bbs/BbsPage.vue'
import BbsIndexPage from '@/pages/bbs/index/BbsIndexPage.vue'
import BlogPage from '@/pages/blog/BlogPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'
import IndexPage from '@/pages/index.vue'
import BlogWritePage from '@/pages/blog/write/BlogWritePage.vue'
import BlogIndexPage from '@/pages/blog/index/BlogIndexPage.vue'


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
      },
    ]
  },
  {
    path: '/blog',
    name: "blogHome",
    component: BlogPage,
    children: [
      {
        path: '',
        name: 'blogIndex',
        component: BlogIndexPage
      },
      {
        path: 'write',
        name: 'blogWrite',
        component: BlogWritePage,
        meta: {
          hideSider: true
        }
      }
    ]
  },
  {
    path: '/profile',
    name: "profile",
    component: ProfilePage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
