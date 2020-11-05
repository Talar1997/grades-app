import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore()
const app = createApp()

app.use(store)

createApp(App).mount('#app')
