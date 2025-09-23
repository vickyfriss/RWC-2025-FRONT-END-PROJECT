import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Country from './pages/Country.vue';
import Login from './pages/Login.vue';
import Welcome from './pages/Welcome.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/country/:name', component: Country, props: route => ({ country: route.params.name }) },
  { path: '/login', component: Login },
  { path: '/welcome', component: Welcome },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
