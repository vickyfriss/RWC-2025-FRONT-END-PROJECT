<template>
  <v-app-bar color="white" app flat class="header-appbar">
    <!-- Logo -->
    <div class="logo-wrapper">
      <a href="https://www.rugbyworldcup.com/2025" target="_blank" rel="noopener">
        <img
          src="https://resources.worldrugby-rims.pulselive.com/worldrugby/photo/2025/09/19/3ed8f135-7d58-4b73-8d5f-fb43e7e40113/ezgif-1c87eb804ebaca.png"
          alt="Women Rugby World Cup Logo"
          class="logo-img"
        />
      </a>
    </div>

    <v-spacer />

    <!-- Desktop Navigation -->
    <div v-if="display.mdAndUp" class="nav-wrapper">
      <template v-if="$route.path !== '/'">
        <v-btn text class="nav-btn" @click="$router.push('/')">Back to Home</v-btn>
      </template>
      <template v-else>
        <v-btn text class="nav-btn" @click="scrollTo('countries')">Pools</v-btn>
        <v-btn text class="nav-btn" @click="scrollTo('map')">Venues</v-btn>
        <v-btn text class="nav-btn" @click="scrollTo('final')">Champions</v-btn>
      </template>

      <template v-if="user">
        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn v-bind="props" class="nav-btn" elevation="2">
              <v-icon left>mdi-account-circle-outline</v-icon>
              {{ user.email }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$router.push('/profile')">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-btn v-else color="primary" class="nav-btn" @click="$router.push('/login')">
        Login
      </v-btn>
    </div>

    <!-- Mobile Hamburger -->
    <v-app-bar-nav-icon
      v-if="!display.mdAndUp"
      @click="drawer = true"
    />

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      right
      class="mobile-drawer"
    >
      <v-list dense>
        <template v-if="$route.path !== '/'">
          <v-list-item @click="$router.push('/'); drawer=false">
            <v-list-item-title>Back to Home</v-list-item-title>
          </v-list-item>
        </template>

        <template v-else>
          <v-list-item @click="scrollTo('countries')">
            <v-list-item-title>Pools</v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollTo('map')">
            <v-list-item-title>Venues</v-list-item-title>
          </v-list-item>
          <v-list-item @click="scrollTo('final')">
            <v-list-item-title>Champions</v-list-item-title>
          </v-list-item>
        </template>

        <v-divider></v-divider>

        <template v-if="user">
          <v-list-item @click="$router.push('/profile'); drawer=false">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="$router.push('/login'); drawer=false">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "AppHeader",
  setup() {
    const drawer = ref(false);
    const display = useDisplay();
    const user = ref(null);

    onAuthStateChanged(auth, (u) => {
      user.value = u;
    });

    const logout = () => {
      signOut(auth).then(() => {
        user.value = null;
        drawer.value = false;
      });
    };

    const scrollTo = (id) => {
      const el = document.getElementById(id);
      if (el) {
        const offset = document.querySelector(".header-appbar").offsetHeight;
        window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
      }
      drawer.value = false;
    };

    return { drawer, display, user, logout, scrollTo };
  },
};
</script>

<style scoped>
.header-appbar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.logo-img {
  height: 60px;
  width: auto;
  display: block;
  object-fit: contain;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-btn {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  color: #111;
}

.nav-btn:hover {
  color: #c20d2d;
}

/* Mobile drawer */
.mobile-drawer .v-list-item-title {
  font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .header-appbar {
    flex-wrap: wrap;
    height: auto;
    padding: 12px 16px;
  }
  .logo-img {
    height: 50px;
  }
}
</style>
