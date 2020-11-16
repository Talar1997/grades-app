import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import {routerMiddleware} from "@/router/router-middleware";

const store = createStore()
const app = createApp(App)

app.use(store)
app.use(router)

router.beforeEach((to, from, next) =>
    routerMiddleware(to, from, next));

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Access-Control-Allow-Method'] = "GET, PATCH, POST, DELETE, OPTIONS";

app.mount('#app')