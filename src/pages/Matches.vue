<template>
  <div class="matches-grid">
    <div 
      v-for="match in matches" 
      :key="match.title" 
      class="match"
    >
      <h3>{{ match.title }}</h3>
      <p>{{ match.teams }}</p>
      <p>{{ match.time }}, {{ match.stadium }}</p>
      <div v-if="match.weather">
        <p>Weather: {{ match.weather.temp }}°C, {{ match.weather.condition }}</p>
        <p>Wind: {{ match.weather.wind }} kph</p>
      </div>
      <div v-else>
        <p>Loading weather...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentWeather } from '@/api/weatherApi'

export default {
  name: 'Matches',
  data() {
    return {
      matches: [
        {
          title: 'Semi-final 1',
          teams: 'New Zealand vs Canada',
          time: 'Friday 19/9 19:00',
          stadium: 'Ashton Gate Stadium',
          city: 'Bristol',
          weather: null
        },
        {
          title: 'Semi-final 2',
          teams: 'France vs England',
          time: 'Saturday 20/9 15:30',
          stadium: 'Ashton Gate Stadium',
          city: 'Bristol',
          weather: null
        },
        {
          title: 'Bronze Final',
          teams: 'Runner-Up SF1 vs Runner-Up SF2',
          time: 'Saturday 27/9 12:30',
          stadium: 'Allianz Stadium',
          city: 'London',
          weather: null
        },
        {
          title: 'Final',
          teams: 'Winner SF1 vs Winner SF2',
          time: 'Saturday 27/9 16:00',
          stadium: 'Allianz Stadium',
          city: 'London',
          weather: null
        }
      ]
    }
  },
  async mounted() {
    // Fetch weather for each match in parallel
    const results = await Promise.all(
      this.matches.map(async match => {
        const weather = await getCurrentWeather(match.city)
        return { ...match, weather }
      })
    )
    this.matches = results
  }
}
</script>

<style>
.matches-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px; 
  max-width: 600px; 
  margin: 20px auto; 
}
.match { 
  text-align: center; 
  padding: 10px; 
  border-radius: 8px; 
  font-weight: bold; 
  background-color: #007bff; 
  color: white;
}
</style>
