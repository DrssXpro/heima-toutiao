import Vue from "vue";
import Vuex from "vuex";
import { articleChannelRequest } from "../service/article_request";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    channels: [],
  },
  mutations: {
    setChannelsData(state, res) {
      state.channels = res;
    },
  },
  actions: {
    getChannelsData(context) {
      return new Promise((resolve, reject) => {
        articleChannelRequest().then((res) => {
          context.commit("setChannelsData", res.data.data.channels);
          resolve("成功获取到频道数据");
        });
      });
    },
  },
  modules: {},
});
