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
  
      <!-- Matches Component -->
      <Matches />
    </v-container>
  </template>
  
  <script>
  import Countries from './Countries.vue'
  import Matches from './Matches.vue'
  
  export default {
    name: 'Home',
    components: { Countries, Matches },
    methods: {
      goToCountry(name) {
        this.$router.push(`/country/${name}`)
      }
    }
  }
  </script>
  
  <style>
  .header {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
  }
  .logo {
    width: 120px;
    height: auto;
  }
  </style>
  