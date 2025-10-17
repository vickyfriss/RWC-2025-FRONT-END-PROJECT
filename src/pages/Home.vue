<template>
  <v-main>
    <v-container fluid class="pa-0 main-container">

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
            <v-btn color="red darken-2" class="mt-6 hero-btn" large @click="scrollTo('countries')">
              Explore Pools
            </v-btn>
          </v-col>
        </v-row>
      </section>

      <!-- Countries Section -->
      <section id="countries" class="section countries-section">
        <Countries @go-to-country="goToCountry" />
      </section>

      <!-- Map Section -->
      <section id="map" class="section map-section">
        <div v-if="mapAvailable">
          <Map />
        </div>
        <div v-else class="text-center my-4">
          <p>⚠️ Map unavailable, please check back later.</p>
        </div>
      </section>

      <!-- Tournament Statistics Section -->
      <section id="stats" class="section stats-section">
        <p class="stats-subtitle">
          Team & player performance at a glance
        </p>
        <StatsCharts />
      </section>

      <!-- Final Game Section -->
      <section id="final" class="section final-section">
        <EnglandChampion />
      </section>

    </v-container>
  </v-main>
</template>

<script>
import Countries from "./Pools.vue";
import Map from "./Map.vue";
import StatsCharts from "./StatsCharts.vue";
import EnglandChampion from "./EnglandChampion.vue";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Home",
  components: { Countries, Map, StatsCharts, EnglandChampion },
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
/* Light blue background for the whole page */
.main-container {
  background-color: #e6f0fa;
}

/* Hero Section */
.hero-section {
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #c20d2d, #ff6b6b);
  color: #fff;
  text-align: center;
  padding: 0 20px;
}

.hero-title {
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.2rem);
  margin-bottom: 1rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.2);
}

.hero-btn {
  font-size: clamp(0.8rem, 2.5vw, 1rem);
  padding: 0.75rem 1.5rem;
}

/* General Section Styling */
.section {
  padding-top: 40px;
  padding-bottom: 40px;
}

/* Countries, Map, Final sections */
.countries-section,
.map-section,
.final-section {
  padding-top: 30px;
  padding-bottom: 30px;
}

/* Stats Section */
.stats-section {
  text-align: center;
  padding: 40px 20px;
}

.stats-subtitle {
  font-size: clamp(1.8rem, 2vw, 1.2rem);
  color: #1976d2;
  font-weight: 600;
  margin-bottom: 25px;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .hero-section {
    min-height: 40vh;
    padding: 0 15px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .hero-btn {
    width: 100%;
    font-size: 0.9rem;
    padding: 0.65rem 1rem;
  }

  .section {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
