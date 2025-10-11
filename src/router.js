// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Country from './pages/Country.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import { auth } from './firebase';

// Lazy load Pool and Venue pages
const Pool = () => import('./pages/Pool.vue');
const Venue = () => import('./pages/Venue.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/country/:name', component: Country, props: route => ({ country: route.params.name }) },
  { path: '/pool/:name', component: Pool, props: true },
  // NEW route for Venue page
  { path: '/venue/:city', name: 'Venue', component: Venue, props: true },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
