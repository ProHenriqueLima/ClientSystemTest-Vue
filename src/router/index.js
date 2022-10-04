import Vue from "vue";
import VueRouter from "vue-router";
import { RoutePath } from "./RouterPath";

Vue.use(VueRouter);

const routes = [
  {
    path: RoutePath.CLIENTES,
    name: "clientes",
    component: () =>
      import(/* webpackChunkName: "group-home" */ "../views/ClientPage.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
