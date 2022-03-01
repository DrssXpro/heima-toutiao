import { articleTableRequest } from "../service/article_request";
import { getImages } from "../service/image_request";
export default {
  namespaced: true,
  state: {
    Articles: [], //获取的table内容
    Images: [], //获取的图片素材内容
    imageCounter: 0, //素材总数量
    imageCurrentPage: 1, //图片分页当前位置
    imageCoverURL: [], //封面上传在线URL
    ArticleCounter: 0, //文章总数量
    ArticlecurrentPage: 1, //文章分页当前位置
    dateTime: [], //时间组件值
    radioStatus: null, //my-radio组件选中状态
    channelStatus: null, //my-channel组件选中状态
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
    setImageCoverURL(state, value) {
      state.imageCoverURL = value;
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
