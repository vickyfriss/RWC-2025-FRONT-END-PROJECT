<template>
  <v-container fluid class="py-8 px-4">
    <!-- Back Button -->
    <v-btn variant="text" color="primary" class="mb-4" @click="$router.push('/')">
      ← Back to Pools
    </v-btn>

    <!-- Pool Title -->
    <h1 class="text-h4 font-weight-bold text-center mb-6">{{ poolName }}</h1>

    <!-- Teams Table -->
    <v-card v-if="pool" outlined class="pa-4 mb-8 pool-card mx-auto">
      <v-card-title class="text-h6 font-weight-bold pb-2">Pool Standings</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-table class="standings-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>W</th>
              <th>L</th>
              <th>PF</th>
              <th>PA</th>
              <th>Diff</th>
              <th>Tries</th>
              <th>Bonus</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in pool.teams" :key="team.name">
              <td class="team-cell">
                <img :src="team.flag" alt="flag" class="team-flag" />
                <span>{{ team.name }}</span>
              </td>
              <td>{{ team.wins }}</td>
              <td>{{ team.losses }}</td>
              <td>{{ team.pointsFor }}</td>
              <td>{{ team.pointsAgainst }}</td>
              <td>{{ team.diff }}</td>
              <td>{{ team.triesFor }}</td>
              <td>{{ team.bonus }}</td>
              <td><strong>{{ team.points }}</strong></td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Matches Section -->
    <v-card v-if="pool" outlined class="pa-4 pool-card mx-auto">
      <v-card-title class="text-h6 font-weight-bold pb-2">Matches</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row dense justify="center">
          <v-col
            v-for="match in pool.matches"
            :key="match.id"
            cols="12"
            sm="10"
            md="8"
            lg="6"
            class="d-flex justify-center"
          >
            <v-card outlined class="match-card pa-4">
              <div class="match-meta">
                <span>{{ match.date }}</span>
                <span>{{ match.stadium }}</span>
              </div>

              <div class="match-grid">
                <!-- Team A Name -->
                <div class="team-name left">{{ match.teamA }}</div>
                <!-- Team A Flag -->
                <img :src="getFlag(match.teamA, match.flagA)" alt="flag" class="match-flag" />
                <!-- Score -->
                <div class="score">{{ match.scoreA }} - {{ match.scoreB }}</div>
                <!-- Team B Flag -->
                <img :src="getFlag(match.teamB, match.flagB)" alt="flag" class="match-flag" />
                <!-- Team B Name -->
                <div class="team-name right">{{ match.teamB }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div v-else class="text-center my-6">
      <p>Pool not found.</p>
    </div>
  </v-container>
</template>

<script>
import { groups } from "../PoolsData.js";

export default {
  name: "Pool",
  props: ["name"],
  data() {
    return {
      poolName: this.$route.params.name,
      pool: null,
    };
  },
  mounted() {
    const decodedName = decodeURIComponent(this.poolName);
    this.pool = groups.find(
      (g) => g.name.toLowerCase() === decodedName.toLowerCase()
    );

    if (!this.pool) console.warn("Pool not found:", decodedName);
  },
  methods: {
    getFlag(teamName, explicitFlag) {
      if (explicitFlag) return explicitFlag;

      const found = this.pool.teams.find(
        (t) => t.name.toLowerCase() === teamName.toLowerCase()
      );
      return found ? found.flag : "";
    },
  },
};
</script>

<style scoped>
/* Card Styling */
.pool-card {
  max-width: 900px;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

/* Table Styling */
.standings-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.standings-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  padding: 10px;
  text-align: center;
}

.standings-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.team-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
}

.team-flag {
  width: 28px;
  height: 18px;
  object-fit: contain;
  border-radius: 2px;
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
  grid-template-columns: 1fr 36px 80px 36px 1fr; /* flexible names, fixed flags/scores */
  align-items: center;
  justify-items: center;
  gap: 8px;
}

.match-grid .team-name.left {
  justify-self: end; /* left team right-aligned */
  text-align: right;
  white-space: nowrap;
}

.match-grid .team-name.right {
  justify-self: start; /* right team left-aligned */
  text-align: left;
  white-space: nowrap;
}

.match-grid .score {
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
    grid-template-columns: 1fr 24px 60px 24px 1fr;
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
    grid-template-columns: 1fr 20px 50px 20px 1fr;
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
