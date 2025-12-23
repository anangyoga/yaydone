import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../pages/Dashboard.vue";
import CreateList from "../pages/CreateList.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/create",
    name: "CreateList",
    component: CreateList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
