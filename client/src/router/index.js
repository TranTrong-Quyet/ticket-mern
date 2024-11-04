import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import CreateTicket from "@/views/CreateTicket.vue";
import PrivateView from "@/views/PrivateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: PrivateView,
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/create-ticket",
          name: "create-ticket",
          component: CreateTicket,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
  ],
});

export default router;
