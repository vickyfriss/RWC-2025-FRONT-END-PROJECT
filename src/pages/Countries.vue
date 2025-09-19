<template>
    <div>
      <!-- Filter Buttons -->
      <v-row justify="center" class="mb-2">
        <v-btn :color="filter==='all' ? 'primary' : 'white'" text small @click="filter='all'" class="mx-1">All</v-btn>
        <v-btn :color="filter==='QF' ? 'primary' : 'white'" text small @click="filter='QF'" class="mx-1">Quarter-Finals</v-btn>
        <v-btn :color="filter==='SF' ? 'primary' : 'white'" text small @click="filter='SF'" class="mx-1">Semi-Finals</v-btn>
      </v-row>
  
      <!-- Groups Grid -->
      <v-row dense>
        <v-col v-for="group in groups" :key="group.name" cols="12" sm="6" lg="3">
          <v-card outlined class="group-card">
            <v-card-title class="small-title justify-center">{{ group.name }}</v-card-title>
            <v-card-text class="p-2">
              <v-list dense>
                <v-list-item
                  v-for="team in group.teams"
                  :key="team.name"
                  :class="{ 'highlight': shouldHighlight(team) }"
                  @click="$emit('go-to-country', team.name)"
                  dense
                >
                  <v-list-item-content class="d-flex align-center flag-row">
                    <v-img :src="team.flag" class="inline-flag" contain />
                    <span class="team-name">{{ team.name }}</span>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Countries',
    data() {
      return {
        filter: 'all',
        groups: [
          { name: 'Pool A', teams: [
            { name: 'England', stage: 'SF', flag: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg' },
            { name: 'Australia', stage: 'QF', flag: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg' },
            { name: 'USA', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
            { name: 'Samoa', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Flag_of_Samoa.svg' },
          ] },
          { name: 'Pool B', teams: [
            { name: 'Canada', stage: 'SF', flag: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg' },
            { name: 'Wales', stage: 'QF', flag: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Flag_of_Wales.svg' },
            { name: 'Scotland', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Flag_of_Scotland.svg' },
            { name: 'Fiji', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Fiji.svg' },
          ] },
          { name: 'Pool C', teams: [
            { name: 'New Zealand', stage: 'SF', flag: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg' },
            { name: 'Ireland', stage: 'QF', flag: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg' },
            { name: 'Japan', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg' },
            { name: 'Spain', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg' },
          ] },
          { name: 'Pool D', teams: [
            { name: 'France', stage: 'SF', flag: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg' },
            { name: 'South Africa', stage: 'QF', flag: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg' },
            { name: 'Italy', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg' },
            { name: 'Brazil', stage: 'none', flag: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg' },
          ] },
        ]
      }
    },
    methods: {
      shouldHighlight(team) {
        if(this.filter==='all') return false
        if(this.filter==='QF') return ['QF','SF'].includes(team.stage)
        if(this.filter==='SF') return team.stage==='SF'
        return false
      }
    }
  }
  </script>
  
  <style>
  .group-card {
    padding: 6px;
    font-size: 0.8rem;
  }
  
  .small-title {
    font-size: 0.85rem !important;
  }
  
  /* Flag and country inline */
  .flag-row {
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: flex-start;
}

/* Force flag box size */
.inline-flag {
  width: 28px;   /* fixed width */
  height: 18px;  /* fixed height */
  object-fit: contain;
  flex-shrink: 0; /* prevent shrinking */
}

/* Ensure names always start after the flag box */
.team-name {
  font-size: 0.95rem;
  font-weight: 500;
  flex: 1;
}
  
  /* Remove default v-list-item-content padding and centering */
  .v-list-item-content {
    padding: 0 !important;
    justify-content: flex-start !important;
    text-align: left !important;
  }
  
  .highlight {
    background-color: #1976d2 !important;
    color: white;
  }
  </style>
  