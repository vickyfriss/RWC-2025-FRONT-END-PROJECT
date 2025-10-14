import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Country from './pages/Country.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import StatsCharts from './pages/StatsCharts.vue'; // ✅ Add this
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
  { path: '/venue/:city', name: 'Venue', component: Venue, props: true },

  // ✅ New stats route
  { path: '/stats', name: 'StatsCharts', component: StatsCharts },

  // Catch-all redirect
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Helper to get current user as a promise
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

// ✅ Auth guard (unchanged)
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = await getCurrentUser();

  if (requiresAuth && !currentUser) {
    next('/login');
  } else if ((to.path === '/login' || to.path === '/register') && currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
