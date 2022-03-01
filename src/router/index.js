import Vue from "vue";
import VueRouter from "vue-router";
import Cache from "../utils/cache";

Vue.use(VueRouter);

const routes = [
  // 配置自己的路由表
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login"),
  },
  {
    path: "/",
    component: () => import("../views/layout"),
    children: [
      {
        // 默认子路由
        path: "",
        name: "home",
        component: () => import("../views/home"),
      },
      {
        path: "/article",
        name: "article",
        component: () => import("../views/article"),
      },
      {
        path: "publish",
        name: "publish",
        component: () => import("../views/publish"),
      },
      {
        path: "image",
        name: "image",
        component: () => import("../views/image"),
      },
      {
        path: "comment",
        name: "comment",
        component: () => import("../views/comment"),
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("../views/personal"),
      },
      {
        path: "fans",
        name: "fans",
        component: () => import("../views/fans"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  //设置路由守卫判断是否存在token，不存在则转到登陆页面
  if (to.path !== "/login") {
    if (!Cache.getItem("token")) {
      next("/login");
    }
  }
  next();
});
export default router;
