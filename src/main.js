import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Leaflet (maps library)
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

// Import marker assets (Vite compatible)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Vuetify instance (create Vue app)
const vuetify = createVuetify({ components, directives });

const app = createApp(App);

// Register Global Leaflet components (to use them directly in templates without importing them in every file)
app.component("LMap", LMap);
app.component("LTileLayer", LTileLayer);
app.component("LMarker", LMarker);
app.component("LPopup", LPopup);

app.use(router);
app.use(vuetify);
app.mount("#app");

// geoJson info - haven't used it in the app yet
import { LGeoJson } from "@vue-leaflet/vue-leaflet";
app.component("LGeoJson", LGeoJson);

