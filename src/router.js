// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Country from './pages/Country.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';  // <-- added
import Profile from './pages/Profile.vue';
import { auth } from './firebase';

// Routes definition
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },  // <-- added
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/country/:name', component: Country, props: route => ({ country: route.params.name }), meta: { requiresAuth: true } },
  // Fallback to home if route not found
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

// Router instance
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // Not logged in, redirect to login
    next('/login');
  } else if (to.path === '/login' && currentUser) {
    // Logged-in users cannot go to login
    next('/');
  } else {
    next();
  }
});

export default router;
