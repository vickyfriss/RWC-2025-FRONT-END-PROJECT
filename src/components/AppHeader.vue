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
  
      <!-- Navigation -->
      <div class="nav-wrapper">
        <v-btn
          v-if="$route.path !== '/'"
          text
          class="nav-btn"
          @click="$router.push('/')"
        >
          Back to Home
        </v-btn>
  
        <template v-else>
          <v-btn text class="nav-btn" @click="scrollTo('pools')">Pools</v-btn>
          <v-btn text class="nav-btn" @click="scrollTo('venues')">Venues</v-btn>
          <v-btn text class="nav-btn" @click="scrollTo('matches')">Matches</v-btn>
          <v-btn text class="nav-btn" @click="scrollTo('map')">Map</v-btn>
        </template>
  
        <!-- User menu / Login -->
        <div v-if="user">
          <v-menu offset-y>
            <template #activator="{ props }">
              <!-- Visible button with icon -->
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
        </div>
  
        <v-btn v-else color="primary" class="nav-btn" @click="$router.push('/login')">
          Login
        </v-btn>
      </div>
    </v-app-bar>
  </template>
  
  <script>
  import { auth } from "../firebase";
  import { onAuthStateChanged, signOut } from "firebase/auth";
  
  export default {
    name: "AppHeader",
    data() {
      return {
        user: null,
      };
    },
    mounted() {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
      });
    },
    methods: {
      logout() {
        signOut(auth).then(() => {
          this.user = null;
          this.$router.push("/login");
        });
      },
      scrollTo(id) {
        const scroll = () => {
          const el = document.getElementById(id);
          if (el) {
            const offset = this.$el.offsetHeight;
            window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
          }
        };
        if (this.$route.path !== "/") {
          this.$router.push("/").then(() => this.$nextTick(scroll));
        } else {
          scroll();
        }
      },
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
  
  @media (max-width: 960px) {
    .header-appbar {
      flex-wrap: wrap;
      height: auto;
      padding: 12px 16px;
    }
    .logo-img {
      height: 50px;
    }
    .nav-wrapper {
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      width: 100%;
    }
    .nav-btn {
      font-size: 0.9rem;
    }
  }
  </style>
  