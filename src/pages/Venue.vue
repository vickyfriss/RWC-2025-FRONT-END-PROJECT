<template>
  <v-app>
    <!-- Global Header -->
    <AppHeader />

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="py-8 px-4">
        <!-- Back Button -->
        <v-btn variant="text" color="primary" class="mb-4" @click="$router.back()">
          ← Back
        </v-btn>

        <!-- Venue Info -->
        <v-card outlined class="pa-4 mb-8 venue-card mx-auto">
          <h1 class="text-h4 font-weight-bold mb-2 text-center">{{ venue?.stadium }}</h1>
          <p><strong>City:</strong> {{ venue?.city }}</p>
          <p><strong>Capacity:</strong> {{ venue?.capacity.toLocaleString() }}</p>
          <div class="venue-image" v-if="venue?.image">
            <img :src="venue.image" :alt="venue.stadium" />
          </div>
        </v-card>

        <!-- Matches Section -->
        <v-card v-if="venueMatches.length" outlined class="pa-4 venue-card mx-auto">
          <v-card-title class="text-h6 font-weight-bold pb-2">Matches</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <v-row dense justify="center">
              <v-col
                v-for="match in venueMatches"
                :key="match.id + match.stage + match.date"
                cols="12"
                sm="10"
                md="8"
                lg="6"
                class="d-flex justify-center"
              >
                <v-card outlined class="match-card pa-4">
                  <div class="match-meta">
                    <span>{{ match.date }}</span>
                    <span>{{ match.stage || match.poolName || "Pool Stage" }}</span>
                  </div>

                  <div class="match-grid">
                    <div class="team-name left">{{ match.teamA }}</div>
                    <img :src="getFlag(match.teamA)" alt="flag" class="match-flag" />
                    <div class="score">
                      <span>{{ match.scoreA }}</span>
                      <span>-</span>
                      <span>{{ match.scoreB }}</span>
                    </div>
                    <img :src="getFlag(match.teamB)" alt="flag" class="match-flag" />
                    <div class="team-name right">{{ match.teamB }}</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <div v-else class="text-center my-6">
          <p>No matches found for this venue.</p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import venues from "../assets/Data/venues.js";
import { groups } from "../assets/Data/PoolsData.js";
import { knockoutGroup } from "../assets/Data/KnockoutData.js";

export default {
  name: "Venue",
  components: { AppHeader },
  data() {
    return {
      venue: null,
      venueMatches: [],
    };
  },
  mounted() {
    const city = this.$route.params.city.toLowerCase();
    this.venue = venues.find((v) => v.city.toLowerCase() === city);

    if (!this.venue) {
      console.warn("Venue not found:", city);
      return;
    }

    const normalize = (str) =>
      str.toLowerCase().replace(/[’']/g, "'").replace(/,/g, "").trim();

    // Flatten all matches
    const poolMatches = groups.flatMap((pool) =>
      pool.matches.map((m) => ({ ...m, poolName: pool.name }))
    );
    const knockoutMatches = knockoutGroup.flatMap((stage) =>
      stage.matches.map((m) => ({ ...m }))
    );
    const allMatches = [...poolMatches, ...knockoutMatches];

    // Filter by city (everything after comma in stadium)
    let venueMatches = allMatches.filter((match) => {
      const matchCity = match.stadium.split(",")[1]?.trim();
      return normalize(matchCity) === normalize(this.venue.city);
    });

    // Remove exact duplicates by teamA, teamB, date
    const seen = new Set();
    this.venueMatches = venueMatches.filter((match) => {
      const key = `${match.teamA}-${match.teamB}-${match.date}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  },
  methods: {
    getFlag(teamName) {
      for (const pool of groups) {
        const team = pool.teams.find((t) => t.name === teamName);
        if (team) return team.flag;
      }
      return "";
    },
  },
};
</script>

<style scoped>
/* Card Styling */
.venue-card {
  max-width: 900px;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.venue-image img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
}

/* Matches Section */
.match-card {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  margin-bottom: 1rem;
}
.match-card:hover {
  transform: scale(1.02);
}

.match-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
}

/* Grid for Alignment */
.match-grid {
  display: grid;
  grid-template-columns: 1fr 36px auto 36px 1fr;
  align-items: center;
  justify-items: center;
  gap: 8px;
}

.match-grid .team-name.left {
  justify-self: end;
  text-align: right;
  white-space: nowrap;
}

.match-grid .team-name.right {
  justify-self: start;
  text-align: left;
  white-space: nowrap;
}

.match-grid .score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-weight: bold;
  font-size: 1.3rem;
  font-family: monospace;
  white-space: nowrap;
}

.match-grid .match-flag {
  width: 28px;
  height: 18px;
  object-fit: contain;
  border-radius: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .match-grid {
    grid-template-columns: 1fr 24px auto 24px 1fr;
    gap: 4px;
  }
  .match-grid .score {
    font-size: 1.1rem;
  }
  .match-grid .match-flag {
    width: 20px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .match-grid {
    grid-template-columns: 1fr 20px auto 20px 1fr;
    gap: 2px;
  }
  .match-grid .score {
    font-size: 1rem;
  }
  .match-grid .match-flag {
    width: 16px;
    height: 10px;
  }
}
</style>
