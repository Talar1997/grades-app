import {createApp} from 'vue'
import store from './store'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import {routerMiddleware} from "@/router/router-middleware"
import 'primeflex/primeflex.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import mitt from "mitt"

const app = createApp(App)
const emitter = mitt()
app.config.globalProperties.emitter = emitter

// FIXME: Nie działa, a wg. dokumentacji powinno
//import ToastService from 'primevue/toastservice';
//app.use(ToastService);
//import ConfirmationService from 'primevue/confirmationservice';
//app.use(ConfirmationService);


//https://github.com/Maronato/vue-toastification/tree/next
const options = {
    position: "bottom-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};
app.use(Toast, options)

app.use(store)
app.use(router)


router.beforeEach((to, from, next) =>
    routerMiddleware(to, from, next));

axios.defaults.withCredentials = true
axios.defaults.headers.common['Access-Control-Allow-Method'] = "GET, PATCH, POST, DELETE, OPTIONS"

app.mount('#app')