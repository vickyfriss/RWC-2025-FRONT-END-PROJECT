<template>
  <v-container fluid class="pa-0 ma-0 w-full">
    <!-- Header -->
    <v-row
      align="center"
      justify="space-between"
      class="my-6 px-6 flex-wrap"
    >
      <!-- Logo -->
      <v-col cols="12" sm="4" md="3" lg="2" class="text-center text-sm-left">
        <a
          href="https://www.rugbyworldcup.com/2025"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/4f/2025_Women%27s_RWC_Logo.svg"
            alt="Women Rugby World Cup Logo"
            class="logo-img"
          />
        </a>
      </v-col>

      <!-- Title -->
      <v-col cols="12" sm="6" md="6" lg="8" class="text-center">
        <h1 class="text-h4 text-sm-h3 font-weight-bold mb-0">
          RUGBY WORLD CUP 2025
        </h1>
      </v-col>

      <!-- Login / User Menu -->
      <v-col
        cols="12"
        sm="2"
        md="3"
        lg="2"
        class="text-center text-sm-right mt-3 mt-sm-0"
      >
        <div v-if="userEmail">
          <v-menu offset-y>
            <template #activator="{ props }">
              <v-btn v-bind="props" icon color="primary">
                <v-icon large>mdi-account-circle-outline</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ userEmail }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item @click="$router.push('/profile')">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>

              <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div v-else>
          <v-btn color="primary" @click="$router.push('/login')">
            Login
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Countries -->
    <v-row class="mx-0">
      <v-col cols="12" class="pa-0">
        <Countries @go-to-country="goToCountry" />
      </v-col>
    </v-row>

    <!-- Map Section -->
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

    <!-- Matches -->
    <v-row class="mx-0">
      <v-col cols="12" class="pa-0">
        <Matches />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Countries from "./Pools.vue";
import Matches from "./Matches.vue";
import Map from "./Map.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Home",
  components: { Countries, Matches, Map },
  data() {
    return {
      mapAvailable: true,
      userEmail: "",
    };
  },
  mounted() {
    // Handle map load fallback
    try {
      if (!Map) throw new Error("Map component failed to load");
    } catch (e) {
      console.error(e);
      this.mapAvailable = false;
    }

    // Firebase auth listener
    onAuthStateChanged(auth, (user) => {
      this.userEmail = user ? user.email : "";
    });
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
  },
};
</script>

<style scoped>
/* Ensure the layout stretches full width */
.v-container {
  width: 100%;
  max-width: 100% !important;
  padding: 0;
  margin: 0;
}

/* Responsive logo */
.logo-img {
  max-width: 100px;
  width: 100%;
  height: auto;
}

@media (max-width: 600px) {
  .logo-img {
    max-width: 80px;
  }
}

/* Header text responsiveness */
h1 {
  font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);
  text-align: center;
}
</style>
