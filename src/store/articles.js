import { articleTableRequest } from "../service/article_request";
export default {
  namespaced: true,
  state: {
    Articles: [], //获取table内容
    dateTime: [],
    currentPage: 1,
    radioStatus: null,
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
  },
  actions: {
    getTableArticles({ state, commit, rootState }, page = 1) {
      return new Promise((resolve, reject) => {
        articleTableRequest({
          page,
          per_page: 10,
          status: state.radioStatus,
          channel_id: rootState.channelValue,
          begin_pubdate: state.dateTime ? state.dateTime[0] : null,
          end_pubdate: state.dateTime ? state.dateTime[1] : null,
        })
          .then((res) => {
            commit("getQueryTableData", res.data.data.results);
            resolve(res.data.data.total_count);
          })
          .catch((err) => reject(err));
      });
    },
  },
};
