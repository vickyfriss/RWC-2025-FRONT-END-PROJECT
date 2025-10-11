<template>
  <v-app>
    <!-- Global Header -->
    <AppHeader />

    <!-- Main content -->
    <v-main>
      <v-container fluid class="pa-0">

        <!-- Hero Section / Title -->
        <section id="hero" class="hero-section">
          <v-row justify="center" class="text-center">
            <v-col cols="12" md="8">
              <h1 class="hero-title">
                2025 Women's Rugby World Cup
              </h1>
              <p class="hero-subtitle">
                Discover the pools, matches, and host cities for the biggest tournament of the year.
              </p>
              <v-btn color="red darken-2" class="mt-6" large @click="scrollTo('countries')">
                Explore Pools
              </v-btn>
            </v-col>
          </v-row>
        </section>

        <!-- Countries Section -->
        <section id="countries" class="section">
          <v-row class="mx-0">
            <v-col cols="12" class="pa-0">
              <Countries @go-to-country="goToCountry" />
            </v-col>
          </v-row>
        </section>

        <!-- Map Section -->
        <section id="map" class="section">
          <v-row justify="center" class="my-8 px-4">
            <h2 class="text-h5 font-weight-bold text-center">
              Host Cities & Venues
            </h2>
          </v-row>
          <v-row class="mx-0">
            <v-col cols="12" class="pa-0">
              <div v-if="mapAvailable">
                <Map />
              </div>
              <div v-else class="text-center my-4">
                <p>⚠️ Map unavailable, please check back later.</p>
              </div>
            </v-col>
          </v-row>
        </section>

        <!-- Matches Section -->
        <section id="matches" class="section">
          <v-row class="mx-0">
            <v-col cols="12" class="pa-0">
              <Matches />
            </v-col>
          </v-row>
        </section>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import Countries from "./Pools.vue";
import Matches from "./Matches.vue";
import Map from "./Map.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Home",
  components: { AppHeader, Countries, Matches, Map },
  data() {
    return {
      mapAvailable: true,
      userEmail: "",
    };
  },
  mounted() {
    try {
      if (!Map) throw new Error("Map component failed to load");
    } catch (e) {
      console.error(e);
      this.mapAvailable = false;
    }

    onAuthStateChanged(auth, (user) => {
      this.userEmail = user ? user.email : "";
    });

    this.scrollToHash(this.$route.hash);
  },
  watch: {
    '$route.hash'(newHash) {
      this.scrollToHash(newHash);
    }
  },
  methods: {
    goToCountry(name) {
      this.$router.push(`/country/${name}`);
    },
    logout() {
      auth.signOut().then(() => {
        this.userEmail = "";
      });
    },
    scrollToHash(hash) {
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    },
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({
          top: el.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  },
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  height: 35vh; /* compact height */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #c20d2d, #ff6b6b);
  color: #fff;
  text-align: center;
  padding: 0 20px;
}

.hero-title {
  font-size: 3rem; /* big letters */
  font-weight: 800;
  margin-bottom: 0.5rem; /* tighter spacing */
  text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.2rem; 
  margin-bottom: 1rem; 
  text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}

/* Sections */
.section {
  padding-top: 80px;
  padding-bottom: 60px;
}

/* Headings */
h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.5rem;
  text-align: center;
}

/* Buttons */
.v-btn {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
