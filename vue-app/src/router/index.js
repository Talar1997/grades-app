import { createWebHistory, createRouter } from "vue-router";

//Import views here
import SubjectDashboard from "@/views/SubjectDashboard.vue";
import Login from "@/views/Login.vue";
import DataTest from "@/views/DataTest.vue";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: SubjectDashboard,
        meta: {title: 'Grades - subjects'}
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {title: 'Grades - Login'}
    },
    {
        path: "/test",
        name: "Test",
        component: DataTest,
        meta: {title: 'Grades - test'}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;