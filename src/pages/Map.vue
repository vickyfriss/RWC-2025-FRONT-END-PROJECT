<template>
    <div class="venue-map">
      <!-- Click-to-open dropdown -->
      <div class="search-bar">
        <div class="dropdown-wrapper">
          <input
            type="text"
            :value="selectedVenue ? `${selectedVenue.city} - ${selectedVenue.stadium}` : ''"
            placeholder="Select city or stadium..."
            readonly
            @click="toggleDropdown"
          />
          <ul v-if="showDropdown" class="dropdown">
            <li
              v-for="venue in venues"
              :key="venue.city"
              @mousedown.prevent="selectVenue(venue)"
            >
              {{ venue.city }} - {{ venue.stadium }}
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Map -->
      <l-map
        ref="mapRef"
        style="height: 500px; width: 100%;"
        :zoom="6"
        :center="mapCenter"
        :scroll-wheel-zoom="false"
      >
        <l-tile-layer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          subdomains="abcd"
          maxZoom="20"
        />
  
        <!-- Stadium markers -->
        <l-marker
          v-for="venue in venues"
          :key="venue.city"
          :lat-lng="venue.coords"
          @ready="registerMarker(venue.city, $event)"
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
        mapCenter: [52.3555, -1.1743],
        markerRefs: {},       // stores Leaflet marker objects
        showDropdown: false,  // controls dropdown visibility
        selectedVenue: null,  // stores selected venue
      };
    },
    methods: {
      registerMarker(city, marker) {
        this.markerRefs[city] = marker;
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      selectVenue(venue) {
        // 1️⃣ Update selected venue immediately
        this.selectedVenue = venue;
  
        // 2️⃣ Zoom map & open popup
        const map = this.$refs.mapRef.mapObject;
        if (map) map.setView(venue.coords, 12);
  
        const marker = this.markerRefs[venue.city];
        if (marker) marker.fire("click");
  
        // 3️⃣ Close dropdown
        this.showDropdown = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .venue-map {
    margin: 20px 0;
  }
  
  .search-bar {
    position: relative;
    width: 100%;
  }
  
  .dropdown-wrapper {
    position: relative;
    cursor: pointer;
  }
  
  .dropdown-wrapper input {
    width: 100%;
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    max-height: 250px;
    overflow-y: auto;
    z-index: 9999; /* ensures it's above the map */
  }
  
  .dropdown li {
    padding: 6px 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  
  .dropdown li:hover {
    background-color: #f0f0f0;
  }
  
  .popup-content {
    font-size: 0.9rem;
    text-align: left;
    width: 250px;
    box-sizing: border-box;
  }
  
  .popup-content h3,
  .popup-content p,
  .popup-content ul,
  .popup-content li,
  .popup-content a {
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
  
  .stadium-image {
    margin-top: 10px;
    text-align: center;
  }
  
  .stadium-image img {
    max-width: 100%;
    max-height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
  </style>
  