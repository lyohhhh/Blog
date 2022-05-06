import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Index",
    component: () => import("@/layout/Index"),
    children: [
      {
        path: "/Index",
        name: "Index",
        component: () => import("@/views/Home/Index"),
        meta: {
          title: "首页",
        },
      },
    ],
  },
];

const routers = createRouter({
  history: createWebHistory(),
  routes,
});

routers.beforeEach((to, from, next) => {
  document.title = <string>to.meta.title || "博客";
  next();
});
export default routers;
