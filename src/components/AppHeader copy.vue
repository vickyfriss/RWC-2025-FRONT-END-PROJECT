<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto flex justify-between items-center py-4 px-6 md:py-6 lg:py-8">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="https://www.rugbyworldcup.com/2025" target="_blank" rel="noopener">
          <img
            src="https://resources.worldrugby-rims.pulselive.com/worldrugby/photo/2025/09/19/3ed8f135-7d58-4b73-8d5f-fb43e7e40113/ezgif-1c87eb804ebaca.png"
            alt="Women Rugby World Cup Logo"
            class="h-12 md:h-16 lg:h-20 object-contain"
          />
        </a>
      </div>

      <!-- Desktop Navigation -->
      <ul class="hidden md:flex gap-6 md:gap-8 lg:gap-10 items-center text-gray-800 font-semibold">
        <li v-for="section in sections" :key="section">
          <button @click="navigateTo(section)" class="hover:text-red-600 transition">
            {{ section }}
          </button>
        </li>
        <li v-if="user">
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A7.966 7.966 0 0012 20a7.966 7.966 0 006.879-2.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ user.email }}
          </span>
          <button @click="logout" class="ml-2 hover:text-red-600 transition">Logout</button>
        </li>
        <li v-else>
          <button @click="$router.push('/login')" class="hover:text-red-600 transition">Login</button>
        </li>
      </ul>

      <!-- Hamburger Icon (mobile only) -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden flex items-center justify-center text-gray-800 focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-200">
      <ul class="flex flex-col items-center gap-4 py-4 text-base">
        <li v-for="section in sections" :key="section + '-mobile'">
          <button @click="navigateTo(section); isOpen = false" class="text-gray-800 hover:text-red-600 font-semibold transition">
            {{ section }}
          </button>
        </li>
        <li v-if="user">
          <button @click="logout; isOpen=false" class="text-gray-800 hover:text-red-600 font-semibold transition">Logout</button>
        </li>
        <li v-else>
          <button @click="$router.push('/login'); isOpen=false" class="text-gray-800 hover:text-red-600 font-semibold transition">Login</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const isOpen = ref(false);
const router = useRouter();
const route = useRoute();
const sections = ['Pools', 'Venues', 'Matches'];
const user = ref(null);

onAuthStateChanged(auth, (u) => {
  user.value = u;
});

function logout() {
  signOut(auth).then(() => {
    user.value = null;
    isOpen.value = false;
  });
}

function navigateTo(section) {
  const id = section.toLowerCase();
  if (route.path === '/') {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else {
    router.push('/').then(() => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }
}
</script>

<style scoped>
/* Optional: smooth mobile menu animation */
</style>
