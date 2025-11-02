import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView 
  },
  {
    path: '/download',
    name: 'download',
    component: () => import('../views/DownloadView.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('../views/DocsView.vue')
  },
  {
    path: '/docs/:slug',
    name: 'docs-detail',
    component: () => import('../views/DocDetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router