<template>
    <section id="final" class="section final-section">
      <div class="final-card">
  
        <!-- Title -->
        <h2 class="final-title">🏆 Final Game Highlight 🏆</h2>
  
        <!-- Match Info -->
        <div class="match-info">
          <h3>England vs Canada</h3>
          <p><strong>Date:</strong> Saturday 27/9/2025</p>
          <p><strong>Time:</strong> 16:00</p>
          <p><strong>Stadium:</strong> Allianz Stadium</p>
  
          <!-- Weather Info -->
          <div v-if="weather" class="weather-info">
            <p><strong>Weather:</strong> {{ weather.temp }}°C, {{ weather.condition }}</p>
            <p><strong>Wind:</strong> {{ weather.wind }} kph</p>
            <p><strong>Rain Chance:</strong> {{ weather.rain }}%</p>
          </div>
          <div v-else class="weather-info">
            <p>Loading weather...</p>
          </div>
  
          <p class="match-result">Result: CAN 13 - 33 ENG</p>
        </div>
  
        <!-- Champion Badge -->
        <div class="champion-badge">
          🏆 England Champions!
        </div>
  
        <!-- Image -->
        <div class="final-image">
          <img 
            src="https://resources.worldrugby-rims.pulselive.com/photo-resources/worldrugby/photo/2025/09/27/76311f52-256b-4a4a-9a4e-bf7b54a4a06f/2237728584.jpg?width=1440" 
            alt="England Champions" 
          />
        </div>
  
        <!-- Message -->
        <p class="final-message">
          Congratulations to England for winning the 2025 Women's Rugby World Cup! 🎉
        </p>
      </div>
    </section>
  </template>
  
  <script>
  import { getForecastWeather } from '@/api/weatherApi';
  
  export default {
    name: "EnglandChampion",
    data() {
      return {
        weather: null
      };
    },
    async mounted() {
      try {
        // Final match details
        const stadium = "Allianz Stadium";
        const date = "2025-09-27";
        const hour = 16;
  
        // Fetch weather from your API
        this.weather = await getForecastWeather(stadium, date, hour);
      } catch (err) {
        console.error("Failed to fetch weather", err);
      }
    }
  };
  </script>
  
  <style scoped>
  .final-section {
    display: flex;
    justify-content: center;
    padding: 40px 20px;
    background: linear-gradient(135deg, #c20d2d, #ff6b6b);
    color: #fff;
    text-align: center;
    font-family: 'Roboto', sans-serif;
  }
  
  .final-card {
    max-width: 650px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 30px 25px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
  
  /* Gold title */
  .final-title {
    font-size: 1.9rem;
    margin-bottom: 15px;
    color: gold;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  }
  
  .match-info h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  
  .match-info p {
    margin: 4px 0;
    font-weight: 500;
  }
  
  .match-result {
    margin-top: 8px;
    font-size: 1.2rem;
    font-weight: 700;
    color: #ffd700; /* gold */
  }
  
  .weather-info {
    margin: 15px 0;
    font-weight: 500;
    font-size: 0.95rem;
  }
  
  .champion-badge {
    margin: 15px 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: gold;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
  }
  
  .final-image {
    margin: 20px 0;
  }
  
  .final-image img {
    width: 100%;
    max-width: 550px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  
  .final-message {
    font-size: 1rem;
    margin-top: 10px;
    font-weight: 600;
  }
  </style>
  