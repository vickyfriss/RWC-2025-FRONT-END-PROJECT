<template>
  <div class="p-4 w-full mx-auto">
    <!-- Filter Buttons -->
    <v-row justify="center" class="mb-4">
      <v-btn
        v-for="f in filters"
        :key="f.value"
        :color="filter === f.value ? 'primary' : 'white'"
        text
        small
        class="mx-1"
        @click="filter = f.value"
      >
        {{ f.label }}
      </v-btn>
    </v-row>

    <!-- Pools Grid -->
    <v-row dense>
      <v-col
        v-for="group in sortedGroups"
        :key="group.name"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card outlined class="group-card hover-card">
          <v-card-title class="pool-title">{{ group.name }}</v-card-title>

          <v-card-text class="p-2">
            <!-- Table -->
            <div class="teams-table">
              <!-- Header -->
              <div class="teams-header">
                <span class="team-col">Team</span>
                <span class="stat-col">W</span>
                <span class="stat-col">L</span>
                <span class="stat-col">PTS</span>
              </div>

              <!-- Rows -->
              <div
                v-for="team in group.teams"
                :key="team.name"
                :class="['team-row', shouldHighlight(team) ? 'highlight' : '']"
              >
                <div class="team-col">
                  <img :src="team.flag" class="inline-flag" />
                  <span class="team-name">{{ team.name }}</span>
                </div>
                <span class="stat-col">{{ team.wins }}</span>
                <span class="stat-col">{{ team.losses }}</span>
                <span class="stat-col team-points">{{ team.points }}</span>
              </div>
            </div>

            <!-- View Details -->
            <v-btn
              text
              small
              color="primary"
              class="mt-2"
              :to="`/pool/${group.name}`"
              router
            >
              View Details
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { groups } from "../assets/Data/PoolsData.js";

export default {
  name: "Pools",
  data() {
    return {
      filter: "all",
      groups,
      filters: [
        { label: "All", value: "all" },
        { label: "Quarter-Finals", value: "QF" },
        { label: "Semi-Finals", value: "SF" },
      ],
    };
  },
  computed: {
    sortedGroups() {
      return this.groups.map(group => ({
        ...group,
        teams: [...group.teams].sort((a, b) => b.points - a.points)
      }));
    },
  },
  methods: {
    shouldHighlight(team) {
      if (this.filter === "all") return false;
      if (this.filter === "QF") return ["QF", "SF"].includes(team.stage);
      if (this.filter === "SF") return team.stage === "SF";
      return false;
    },
  },
};
</script>

<style scoped>
/* Card Styles */
.group-card {
  padding: 6px;
  border-radius: 10px;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  width: 100%;
}
.hover-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Title */
.pool-title {
  font-weight: bold;
  font-size: 1rem !important;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #1976d2, #004ba0);
  border-radius: 6px;
  padding: 0.4rem 0;
  margin-bottom: 0.4rem;
}

/* Table */
.teams-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

/* Header & Rows */
.teams-header,
.team-row {
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 60px 60px 60px;
  align-items: center;
  justify-items: start;
  gap: 0;
  padding: 6px 10px;
  border-bottom: 1px solid #ccc;
  text-align: left;
}

.teams-header {
  font-weight: 600;
  background-color: #f5f5f5;
}

.team-row {
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.team-col {
  display: flex;
  align-items: center;
  gap: 10px;
}

.inline-flag {
  width: 22px;
  height: 14px;
  object-fit: contain;
  flex-shrink: 0;
  margin-left: 0;
}

.team-name {
  white-space: nowrap;
}

.stat-col {
  text-align: left;
  width: 60px;
}

.team-points {
  font-weight: bold;
  color: #1976d2;
}

/* Highlight QF/SF */
.highlight {
  background-color: #1976d2 !important;
  color: white;
}

/* Responsive */
@media (max-width: 1280px) {
  .teams-header,
  .team-row {
    grid-template-columns: minmax(140px, 1fr) 50px 50px 50px;
  }
}

@media (max-width: 768px) {
  .teams-header,
  .team-row {
    grid-template-columns: minmax(120px, 1fr) 40px 40px 40px;
    font-size: 0.75rem;
  }
}
</style>
