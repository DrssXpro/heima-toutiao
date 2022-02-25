import { articleTableRequest } from "../service/article_request";
import { getImages } from "../service/image_request";
export default {
  namespaced: true,
  state: {
    Articles: [], //获取table内容
    Images: [],
    imageCounter: 0,
    imageCurrentPage: 1,
    ArticleCounter: 0,
    ArticlecurrentPage: 1,
    dateTime: [],
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
    getImageData(state, value) {
      state.Images = value;
    },
    setArticleCurrentPage(state, value) {
      state.ArticlecurrentPage = value;
    },
    setImageCurrentPage(state, value) {
      state.imageCurrentPage = value;
    },
    setArticleCounter(state, value) {
      state.ArticleCounter = value;
    },
    setImageCounter(state, value) {
      state.imageCounter = value;
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
            commit("setArticleCounter", res.data.data.total_count);
            resolve(state.ArticleCounter);
          })
          .catch((err) => reject(err));
      });
    },
    getImages({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        getImages({
          ...payload,
          per_page: 12,
        })
          .then((res) => {
            commit("getImageData", res.data.data.results);
            commit("setImageCounter", res.data.data.total_count);
            resolve(state.imageCounter);
          })
          .catch((err) => reject(err));
      });
    },
  },
};
