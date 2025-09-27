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
        <p>Rain chance: {{ match.weather.rain }}%</p>
      </div>
      <div v-else>
        <p>Loading weather...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getForecastWeather } from '@/api/weatherApi'

/**
 * Converts a match time string like "Friday 19/9 19:00"
 * into { date: "YYYY-MM-DD", hour: Number }
 */
function parseMatchTime(timeString) {
  const parts = timeString.split(' '); // ["Friday", "19/9", "19:00"]
  const [day, month] = parts[1].split('/').map(Number);
  const [hours] = parts[2].split(':').map(Number);
  const year = 2025; // RWC year

  const date = `${year}-${month.toString().padStart(2,'0')}-${day.toString().padStart(2,'0')}`;
  return { date, hour: hours };
}

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
          weather: null
        },
        {
          title: 'Semi-final 2',
          teams: 'France vs England',
          time: 'Saturday 20/9 15:30',
          stadium: 'Ashton Gate Stadium',
          weather: null
        },
        {
          title: 'Bronze Final',
          teams: 'New Zealand vs France',
          time: 'Saturday 27/9 12:30',
          stadium: 'Allianz Stadium',
          weather: null
        },
        {
          title: 'Final',
          teams: 'England vs Canada',
          time: 'Saturday 27/9 16:00',
          stadium: 'Allianz Stadium',
          weather: null
        }
      ]
    }
  },
  async mounted() {
    // Fetch weather for each match in parallel
    const results = await Promise.all(
      this.matches.map(async match => {
        const { date, hour } = parseMatchTime(match.time);
        const weather = await getForecastWeather(match.stadium, date, hour);
        return { ...match, weather };
      })
    );
    this.matches = results;
  }
}
</script>

<style>
.matches-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px; 
  max-width: 800px; 
  margin: 20px auto; 
}
.match { 
  text-align: center; 
  padding: 15px; 
  border-radius: 8px; 
  font-weight: bold; 
  background-color: #007bff; 
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
