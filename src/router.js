import { createWebHistory, createRouter } from "vue-router";

import AppView from "./views/AppView.vue";
import HomeView from "./views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/app",
        name: "App",
        component: AppView,
        children: [
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to.path, to.path.startsWith("/app"));
    if (to.path.startsWith("/app") && !localStorage.getItem("token")) {
        next("/");
    }
    next();
});

export default router;
