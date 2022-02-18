import { articleTableRequest } from "../service/article_request";
export default {
  namespaced: true,
  state: {
    Articles: [], //获取table内容
    dateTime: [],
    Counter: 0,
    currentPage: 1,
    radioStatus: null,
    channelStatus: null,
  },
  mutations: {
    setDateTime(state, value) {
      state.dateTime = value;
    },
    getQueryTableData(state, value) {
      state.Articles = value;
    },
    setCurrentPage(state, value) {
      state.currentPage = value;
    },
    setRadioStatus(state, value) {
      state.radioStatus = value;
    },
    setChannelStatus(state, value) {
      state.channelStatus = value;
    },
  },
  actions: {
    getTableArticles({ state, commit }, page = 1) {
      return new Promise((resolve, reject) => {
        articleTableRequest({
          page,
          per_page: 10,
          status: state.radioStatus,
          channel_id: state.channelStatus,
          begin_pubdate: state.dateTime ? state.dateTime[0] : null,
          end_pubdate: state.dateTime ? state.dateTime[1] : null,
        })
          .then((res) => {
            commit("getQueryTableData", res.data.data.results);
            state.Counter = res.data.data.total_count;
            resolve(state.Counter);
          })
          .catch((err) => reject(err));
      });
    },
  },
};
