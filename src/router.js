// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Country from './pages/Country.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import { auth } from './firebase';

// Routes definition
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/country/:name', component: Country, props: route => ({ country: route.params.name }) }, // removed requiresAuth
  // Fallback to home if route not found
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect authenticated routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // Not logged in, redirect to login
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    // Logged-in users cannot go to login or register
    next('/');
  } else {
    next();
  }
});

export default router;
