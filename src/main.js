// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// ✅ Tailwind CSS
import "./assets/tailwind.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// ✅ MDI Icons (for hamburger menu, menus, etc.)
import "@mdi/font/css/materialdesignicons.css";

// Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LGeoJson } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

// Fix default Leaflet markers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    global: {
      ripple: false, // optional
    },
  },
});

// Create Vue app
const app = createApp(App);

// Register global Leaflet components
app.component("LMap", LMap);
app.component("LTileLayer", LTileLayer);
app.component("LMarker", LMarker);
app.component("LPopup", LPopup);
app.component("LGeoJson", LGeoJson);

// Use router and Vuetify
app.use(router);
app.use(vuetify);

// Mount app
app.mount("#app");
