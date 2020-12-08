import { createWebHistory, createRouter } from "vue-router";

import SubjectDashboard from "@/views/SubjectDashboard.vue";
import Subject from "@/views/Subject.vue";
import Login from "@/views/Login.vue";
import DataTest from "@/views/DataTest.vue";
import Students from "@/views/Students";
import Users from "@/views/Users";

const routes = [
    {
        path: "/:catchAll(.*)",
        name: 'Default path',
        component: SubjectDashboard,
        meta: {
            title: 'Dashboard - Resource Manager',
            requireAuth: true,
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: SubjectDashboard,
        meta: {
            title: 'Dashboard - GradesApp',
            requireAuth: true,
        }
    },
    {
        path: "/students",
        name: "Students",
        component: Students,
        meta: {
            title: 'Students - GradesApp',
            requireAuth: true,
        }
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        meta: {
            title: 'Users - GradesApp',
            requireAuth: true,
        }
    },
    {
        path: "/subject/:id",
        name: "Subject",
        component: Subject,
        meta: {
            title: 'Subject - GradesApp',
            requireAuth: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: 'Login - GradesApp',
            requireAuth: false
        }
    },
    {
        path: "/test",
        name: "Test",
        component: DataTest,
        meta: {
            title: 'Test subpage',
            requireAuth: false
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;