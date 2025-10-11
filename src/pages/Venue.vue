<template>
    <v-container fluid class="py-6 px-4">
      <!-- Back Button -->
      <v-btn variant="text" color="primary" class="mb-4" @click="$router.back()">
        ← Back
      </v-btn>
  
      <!-- Venue Info -->
      <v-card outlined class="pa-4 mb-6 venue-card mx-auto">
        <h1 class="text-h5 font-weight-bold mb-2">{{ venue?.stadium }}</h1>
        <p><strong>City:</strong> {{ venue?.city }}</p>
        <p><strong>Capacity:</strong> {{ venue?.capacity.toLocaleString() }}</p>
        <div class="venue-image" v-if="venue?.image">
          <img :src="venue.image" :alt="venue.stadium" />
        </div>
      </v-card>
  
      <!-- Matches -->
      <v-card v-if="venueMatches.length" outlined class="pa-4 mx-auto matches-card">
        <v-card-title class="text-h6 font-weight-bold pb-2">Matches</v-card-title>
        <v-divider></v-divider>
  
        <v-card-text>
          <v-row dense justify="center">
            <v-col
              v-for="match in venueMatches"
              :key="match.id + match.stage"
              cols="12"
              sm="10"
              md="8"
              class="mb-4"
            >
              <v-card outlined class="match-card pa-3">
                <div class="match-meta mb-2">
                  <span>{{ match.date }}</span>
                  <span>{{ match.stage || match.poolName || "Pool Stage" }}</span>
                </div>
                <div class="match-grid">
                  <div class="team-name left">{{ match.teamA }}</div>
                  <img :src="getFlag(match.teamA)" alt="flag" class="match-flag" />
                  <div class="score">{{ match.scoreA }} - {{ match.scoreB }}</div>
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
  </template>
  
  <script>
  import venues from "../assets/Data/venues.js";
  import { groups } from "../assets/Data/PoolsData.js";
  import { knockoutGroup } from "../assets/Data/KnockoutData.js"; // new knockout stage JS
  
  export default {
    name: "Venue",
    data() {
      return {
        venue: null,
        venueMatches: [],
      };
    },
    mounted() {
      const city = this.$route.params.city;
  
      // Find the venue by city
      this.venue = venues.find(v => v.city.toLowerCase() === city.toLowerCase());
  
      if (this.venue) {
        const normalize = str =>
          str
            .toLowerCase()
            .replace(/[’']/g, "'")
            .replace(/,/g, "")
            .trim();
  
        // Flatten pool matches
        const poolMatches = groups.flatMap(pool =>
          pool.matches.map(m => ({ ...m, poolName: pool.name }))
        );
  
        // Flatten knockout matches
        const knockoutMatches = knockoutGroup.flatMap(stage =>
          stage.matches.map(m => ({ ...m }))
        );
  
        // Combine both
        const allMatches = [...poolMatches, ...knockoutMatches];
  
        // Filter matches for this venue
        this.venueMatches = allMatches.filter(match =>
          normalize(match.stadium).includes(normalize(this.venue.stadium))
        );
      } else {
        console.warn("Venue not found:", city);
      }
    },
    methods: {
      getFlag(teamName) {
        for (const pool of groups) {
          const team = pool.teams.find(t => t.name === teamName);
          if (team) return team.flag;
        }
        return "";
      },
    },
  };
  </script>
  
  <style scoped>
  .venue-card,
  .matches-card {
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
  
  /* Match Card */
  .match-card {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
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
  
  /* Grid for alignment */
  .match-grid {
    display: grid;
    grid-template-columns: auto 36px 100px 36px auto;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  
  .match-grid .score {
    text-align: center;
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
    display: block;
    justify-self: center;
  }
  
  .match-grid .team-name {
    white-space: nowrap;
    font-weight: 500;
  }
  
  @media (max-width: 600px) {
    .match-grid {
      grid-template-columns: auto 24px 80px 24px auto;
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
  </style>
  