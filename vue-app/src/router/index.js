import { createWebHistory, createRouter } from "vue-router";

//Import views here
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {title: 'Grades - Main board'}
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {title: 'Grades - Login'}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;