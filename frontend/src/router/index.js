import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/feed",
    name: "Feed",
    component: () => import("@/views/Feed.vue"),
  },
  {
    path: "/account/me",
    name: "MyAccount",
    component: () => import("@/views/MyAccount.vue"),
  },
  {
    path: "/account/:id",
    name: "Account",
    component: () => import("@/views/Account.vue"),
  },
  {
    path: "/error/:message",
    name: "Error",
    component: () => import("@/views/Error.vue"),
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("@/views/Search.vue"),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
