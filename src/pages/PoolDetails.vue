<template>
    <v-container class="py-6">
      <h2 class="text-2xl font-bold mb-6">{{ pool.name }} - Full Details</h2>
  
      <!-- Teams Table -->
      <v-simple-table dense>
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>PF</th>
            <th>PA</th>
            <th>+/-</th>
            <th>TF</th>
            <th>BP</th>
            <th>PTS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in pool.teams" :key="team.name">
            <td class="flex items-center space-x-2">
              <v-img :src="team.flag" contain class="inline-flag" />
              <span>{{ team.name }}</span>
            </td>
            <td>{{ team.wins }}</td>
            <td>{{ team.losses }}</td>
            <td>{{ team.pointsFor }}</td>
            <td>{{ team.pointsAgainst }}</td>
            <td>{{ team.diff }}</td>
            <td>{{ team.triesFor }}</td>
            <td>{{ team.bonus }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </tbody>
      </v-simple-table>
  
      <!-- Matches -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold mb-3">Matches</h3>
        <div v-for="match in pool.matches" :key="match.id" class="flex justify-between p-2 mb-2 bg-gray-100 rounded">
          <span>{{ match.teamA }}</span>
          <span class="font-bold text-blue-600">{{ match.scoreA }} - {{ match.scoreB }}</span>
          <span>{{ match.teamB }}</span>
        </div>
      </div>
    </v-container>
  </template>
  
  <script>
  import { useRoute } from "vue-router";
  import { groups } from "../PoolsData.js";
  
  export default {
    name: "PoolDetails",
    setup() {
      const route = useRoute();
      const poolName = decodeURIComponent(route.params.name);
      const pool = groups.find((p) => p.name === poolName);
      return { pool };
    },
  };
  </script>
  
  <style scoped>
  .inline-flag {
    width: 24px;
    height: 16px;
  }
  </style>
  