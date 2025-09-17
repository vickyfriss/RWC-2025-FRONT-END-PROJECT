import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify imports
import 'vuetify/styles'               // Vuetify CSS
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
