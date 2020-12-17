import {createApp} from 'vue'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import {routerMiddleware} from "@/router/router-middleware"
import 'primeflex/primeflex.css'
import mitt from "mitt"
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'


const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter

app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

router.beforeEach((to, from, next) =>
    routerMiddleware(to, from, next));

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Method'] = "GET, PATCH, POST, DELETE, OPTIONS"

app.mount('#app')