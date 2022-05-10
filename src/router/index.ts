import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Index",
    component: () => import("@/layout/Index"),
    meta: {
      keepAlive: true,
    },
    children: [
      {
        path: "/Index",
        name: "Index",
        component: () => import("@/views/Home/Index"),
        meta: {
          title: "首页",
          keepAlive: true,
        },
      },
      {
        path: "/Details/:id",
        name: "Details",
        component: () => import("@/views/Article/Details"),
        meta: {
          title: "文章详情",
        },
      },
      {
        path: "/:pathMatch(.*)",
        component: () => import("@/views/404"),
        meta: {
          title: "页面不存在",
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
