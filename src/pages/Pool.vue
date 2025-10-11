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
            md="6"
            lg="5"
            class="d-flex justify-center"
          >
            <v-card outlined class="match-card pa-4">
              <div class="match-meta">
                <span>{{ match.date }}</span>
                <span>{{ match.stadium }}</span>
              </div>

              <div class="match-teams">
                <div class="team-side">
                  <img
                    :src="getFlag(match.teamA, match.flagA)"
                    alt="flag"
                    class="match-flag"
                  />
                  <span>{{ match.teamA }}</span>
                </div>

                <div class="match-score">
                  {{ match.scoreA }} - {{ match.scoreB }}
                </div>

                <div class="team-side">
                  <img
                    :src="getFlag(match.teamB, match.flagB)"
                    alt="flag"
                    class="match-flag"
                  />
                  <span>{{ match.teamB }}</span>
                </div>
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
.pool-card {
  max-width: 900px;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
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
  max-width: 420px;
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

.match-teams {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  text-align: center;
}

.team-side {
  display: flex;
  align-items: center;
  gap: 8px;
}

.match-flag {
  width: 28px;
  height: 18px;
  object-fit: contain;
  border-radius: 2px;
}

.match-score {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
