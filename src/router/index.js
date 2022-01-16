import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login";
import home from '../views/home'
import layout from '../views/layout'
Vue.use(VueRouter);

const routes = [
  // 配置自己的路由表
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path:"/",
    component:layout,
    children:[
      {
        // 默认子路由
        path:"",
        name:"home",
        component:home
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
