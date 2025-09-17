import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Country from './pages/Country.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/country/:name', component: Country, props: route => ({ country: route.params.name }) }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
