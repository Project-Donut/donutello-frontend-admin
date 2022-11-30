import { createWebHistory, createRouter } from 'vue-router';

import DashboardView from "./views/DashboardView.vue";
import LoginView from "./views/LoginView.vue";

const routes = [
    {
        path: "/",
        component: LoginView,
    },
    {
        path: "/dashboard",
        component: DashboardView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;