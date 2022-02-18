import Vue from "vue";
import Vuex from "vuex";
import { articleChannelRequest } from "../service/article_request";
import articles from "./articles";
import editArticle from "./editArticle";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    channels: [], //存储频道当中的选项
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
  modules: { m_article: articles, m_editArticle: editArticle },
});
