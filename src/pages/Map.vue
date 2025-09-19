<template>
    <div class="venue-map">
      <l-map
        ref="mapRef"
        style="height: 600px; width: 100%;"
        :zoom="6"
        :center="mapCenter"
        :scroll-wheel-zoom="false"
      >
        <!-- Base map -->
        <l-tile-layer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom="20"
        />
  
        <!-- England GeoJSON layer -->
        <l-geo-json
          v-if="england"
          :geojson="england"
          :options-style="styleEngland"
          @add="fitToEngland"
        />
  
        <!-- Stadium markers -->
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
                  Link to official page
                </a>
              </p>
              <!-- Stadium image -->
              <div class="stadium-image">
                <img v-if="venue.image" :src="venue.image" :alt="venue.stadium" />
              </div>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </template>
  
  <script>
  import venues from "../assets/Data/venues.js";
  
  export default {
    name: "Map",
    data() {
      return {
        venues,
        mapCenter: [52.3555, -1.1743], // roughly central England
        england: null
      };
    },
    async created() {
      try {
        const res = await fetch("/data/england.geojson");
        this.england = await res.json();
      } catch (err) {
        console.error("Failed to load England GeoJSON:", err);
      }
    },
    methods: {
      styleEngland(feature) {
        return {
          color: "#d32f2f",
          weight: 2,
          fillColor: "#d32f2f",
          fillOpacity: 0.5
        };
      },
      fitToEngland(e) {
        const map = this.$refs.mapRef.mapObject;
        if (map && e.target) {
          map.fitBounds(e.target.getBounds(), { padding: [20, 20] });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .venue-map {
    margin: 20px 0;
  }
  
  /* Force all popup content left-aligned and same width */
  .popup-content {
    font-size: 0.9rem;
    text-align: left;
    width: 250px;       /* fixed width for uniformity */
    box-sizing: border-box;
  }
  
  .popup-content h3,
  .popup-content p,
  .popup-content ul,
  .popup-content li,
  .popup-content a {
    text-align: left;
    margin: 0 0 5px 0;
    padding: 0;
  }
  
  .popup-content ul {
    padding-left: 15px;
    margin: 5px 0;
    list-style: disc;
  }
  
  .popup-content a {
    text-decoration: underline;
    color: #1976d2;
    display: inline-block;
  }
  
  /* Stadium image styling */
  .stadium-image {
    margin-top: 10px;
    text-align: center;
  }
  
  .stadium-image img {
    max-width: 100%;
    max-height: 80px; /* small image */
    object-fit: cover;
    border-radius: 4px;
  }
  </style>
  