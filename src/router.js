import { createWebHistory, createRouter } from 'vue-router';

import DashboardView from "./views/DashboardView.vue";
import HomeView from "./views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: DashboardView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;