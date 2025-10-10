<template>
  <v-container class="py-8">
    <!-- Back Button -->
    <v-btn text color="primary" @click="$router.push('/')">
      ← Back to Pools
    </v-btn>

    <!-- Pool Title -->
    <h1 class="text-h4 font-weight-bold my-4">Pool {{ poolName }}</h1>

    <!-- Teams Table -->
    <v-card v-if="pool" outlined class="pa-4 mb-6">
      <v-card-title>Teams</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in pool.teams" :key="team.name">
              <td class="team-col">
                <img
                  :src="team.flag"
                  class="inline-flag"
                  alt="flag"
                />
                {{ team.name }}
              </td>
              <td>{{ team.wins }}</td>
              <td>{{ team.losses }}</td>
              <td><strong>{{ team.points }}</strong></td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Matches Section -->
    <v-card v-if="pool" outlined class="pa-4">
      <v-card-title>Matches</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="match in pool.matches"
            :key="match.id"
            class="match-item"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ match.teamA }} {{ match.scoreA }} - {{ match.scoreB }} {{ match.teamB }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Fallback if pool not found -->
    <div v-else>
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
    // Decode the route param in case of spaces
    const decodedName = decodeURIComponent(this.poolName);
    this.pool = groups.find(
      (g) => g.name.toLowerCase() === decodedName.toLowerCase()
    );

    if (!this.pool) console.warn("Pool not found:", decodedName);
  },
};
</script>

<style scoped>
.v-table {
  width: 100%;
  border-collapse: collapse;
}
.v-table th,
.v-table td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}
.v-table th {
  background-color: #f5f5f5;
  text-align: left;
}

.team-col {
  display: flex;
  align-items: center;
  gap: 6px;
}

.inline-flag {
  width: 24px;
  height: 16px;
  object-fit: contain;
}

/* Matches */
.match-item {
  border-bottom: 1px solid #eee;
  padding: 6px 0;
}
</style>
