import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import VueParticles from "vue-particles";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/index.less";

//富文本编辑器全局引入
import "element-tiptap/lib/index.css";
import { ElementTiptapPlugin } from "element-tiptap";
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.config.productionTip = false;
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, {
  lang: "zh",
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
