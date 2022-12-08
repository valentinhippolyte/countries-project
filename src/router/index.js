import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import PageNotFound from "../views/PageNotFound.vue";
import CountriesView from "../views/CountriesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/countries",
      name: "countries",
      component: CountriesView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      name: "NotFound",
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;
