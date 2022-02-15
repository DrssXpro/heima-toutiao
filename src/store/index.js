import Vue from "vue";
import Vuex from "vuex";
import { articleChannelRequest } from "../service/article_request";
import articles from "./articles";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    channels: [], //存储频道当中的选项
    channelValue: null, //记录频道选中的选项
    radioStatus: null, //存储radio组件选择的内容
  },
  mutations: {
    setChannelsData(state, res) {
      state.channels = res;
    },
    setChannelValue(state, res) {
      state.channelValue = res;
    },
    setRadioStatus(state, res) {
      state.radioStatus = res;
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
  modules: { m_article: articles },
});
