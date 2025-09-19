<template>
  <v-container>
    <!-- Header -->
    <v-row align="center" class="my-6">
      <!-- Logo on the left -->
      <v-col cols="auto">
        <a href="https://www.rugbyworldcup.com/2025" target="_blank" rel="noopener">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/4f/2025_Women%27s_RWC_Logo.svg"
            alt="Women Rugby World Cup Logo"
            style="max-width: 80px;"
          />
        </a>
      </v-col>

      <!-- Title centered -->
      <v-col class="text-center">
        <h1 class="text-h3 font-weight-bold">RUGBY WORLD CUP 2025</h1>
      </v-col>
    </v-row>

    <!-- Countries Component -->
    <Countries @go-to-country="goToCountry" />

    <!-- Map Component -->
    <v-row justify="center" class="my-4">
      <h2 class="text-h5 font-weight-bold">Host Cities & Venues</h2>
    </v-row>

    <div v-if="mapAvailable">
      <Map />
    </div>
    <div v-else class="text-center my-4">
      <p>⚠️ Map unavailable, please check back later.</p>
    </div>

    <!-- Matches Component -->
    <Matches />
  </v-container>
</template>

<script>
import Countries from "./Countries.vue";
import Matches from "./Matches.vue";
import Map from "./Map.vue";

export default {
  name: "Home",
  components: { Countries, Matches, Map },
  data() {
    return {
      mapAvailable: true
    };
  },
  mounted() {
    try {
      // If Map has critical issues, set fallback
      if (!Map) throw new Error("Map component failed to load");
    } catch (e) {
      console.error(e);
      this.mapAvailable = false;
    }
  },
  methods: {
    goToCountry(name) {
      this.$router.push(`/country/${name}`);
    }
  }
};
</script>
