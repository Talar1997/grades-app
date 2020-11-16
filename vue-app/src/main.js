import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'

const store = createStore()
const app = createApp(App)

app.use(store)
app.use(router)

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Method'] = "GET, PATCH, POST, DELETE, OPTIONS";

app.mount('#app')