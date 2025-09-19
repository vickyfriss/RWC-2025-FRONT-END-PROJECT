<template>
    <div class="venue-map">
      <l-map
        style="height: 600px; width: 100%;"
        :zoom="6"
        :center="mapCenter"
        :scroll-wheel-zoom="false"
      >
        <!-- Map Tiles -->
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
  
        <!-- Stadium Markers -->
        <l-marker
          v-for="venue in venues"
          :key="venue.city"
          :lat-lng="venue.coords"
        >
          <l-popup>
            <div class="popup-content">
              <h3>{{ venue.stadium }}</h3>
              <p><strong>City:</strong> {{ venue.city }}</p>
              <p><strong>Capacity:</strong> {{ venue.capacity.toLocaleString() }}</p>
              <p><strong>Matches:</strong></p>
              <ul>
                <li>Pool Stage: {{ venue.matches.poolStage }}</li>
                <li>Quarter-Finals: {{ venue.matches.quarterFinals }}</li>
                <li>Semi-Finals: {{ venue.matches.semiFinals }}</li>
                <li>Final: {{ venue.matches.final }}</li>
              </ul>
              <p>
                <a :href="venue.link" target="_blank" rel="noopener">
                  For more info, visit the official page
                </a>
              </p>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import venues from "../assets/Data/venues.js"; // relative path
  
  export default {
    name: "Map",
    data() {
      return {
        venues,
        mapCenter: [52.3555, -1.1743] // Approx center of England
      };
    }
  };
  </script>
  
  <style scoped>
  .venue-map {
    margin: 20px 0;
  }
  
  .popup-content {
    max-width: 220px;
    font-size: 0.9rem;
  }
  
  .popup-content h3 {
    margin-bottom: 5px;
  }
  
  .popup-content ul {
    padding-left: 15px;
    margin: 5px 0;
  }
  
  .popup-content a {
    text-decoration: underline;
    color: #1976d2;
  }
  </style>
  