<template>
  <div class="venue-section">
    <!-- Section title -->
    <h2 class="section-title">Venues Map & Details</h2>

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
        style="height: 500px; width: 100%; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);"
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
          @click="selectVenueFromMap(venue)"
        >
          <l-popup class="popup-card">
            <div class="popup-content">
              <h3>{{ venue.stadium }}</h3>
              <p><strong>City:</strong> {{ venue.city }}</p>
              <p><strong>Capacity:</strong> {{ venue.capacity.toLocaleString() }}</p>
              <div class="stadium-image">
                <img v-if="venue.image" :src="venue.image" :alt="venue.stadium" />
              </div>

              <!-- More Info Button -->
              <v-btn
                small
                color="primary"
                class="mt-2 btn-uppercase"
                @click="$router.push({ name: 'Venue', params: { city: venue.city } })"
              >
                More Info
              </v-btn>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import venues from "../assets/Data/venues.js";

export default {
  name: "Map",
  data() {
    return {
      venues,
      // Center roughly in England
      mapCenter: [53, -1.8],
      markerRefs: {},
      showDropdown: false,
      selectedVenue: null,
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
      this.selectedVenue = venue;
      const map = this.$refs.mapRef.mapObject;
      if (map) map.setView(venue.coords, 12);
      const marker = this.markerRefs[venue.city];
      if (marker) marker.fire("click");
      this.showDropdown = false;
    },
    selectVenueFromMap(venue) {
      this.selectedVenue = venue;
    },
  },
};
</script>

<style scoped>
.venue-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 20px;
  text-align: center;
}

/* Map container */
.venue-map {
  width: 100%;
  max-width: 800px; /* restrict width */
}

/* Search bar */
.search-bar {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
}

.dropdown-wrapper {
  position: relative;
  cursor: pointer;
}

.dropdown-wrapper input {
  width: 100%;
  padding: 8px 12px;
  font-size: 0.95rem;
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
  z-index: 9999;
}

.dropdown li {
  padding: 6px 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}

/* Popup card */
.popup-card .leaflet-popup-content-wrapper {
  border-radius: 12px;
  width: 260px !important;
  min-width: 260px !important;
  max-width: 260px !important;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
}

.popup-card .leaflet-popup-content {
  margin: 0;
  padding: 0;
}

.popup-content h3 {
  margin-bottom: 6px;
  font-weight: bold;
  color: #1976d2;
  text-align: center;
  word-wrap: break-word;
}

.popup-content p {
  margin: 2px 0;
  text-align: center;
}

.stadium-image {
  margin-top: 10px;
  text-align: center;
}

.stadium-image img {
  max-width: 100%;
  max-height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.btn-uppercase {
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

/* Map styling */
.leaflet-container {
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}
</style>
