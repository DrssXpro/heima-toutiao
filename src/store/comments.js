import { articleTableRequest } from "../service/article_request";

export default {
  namespaced: true,
  state: {
    Comments: [],
    currentPage: 0,
  },
  mutations: {
    setComments(state, value) {
      //为每一项数据添加statusDisabled来控制loading
      value.forEach((item) => {
        item.statusDisabled = false;
      });
      state.Comments = value;
      console.log(value);
    },
    setCurrentPage(state, value) {
      state.currentPage = value;
    },
  },
  actions: {
    //获取评论
    getComments({ commit }, page = 1) {
      return new Promise((resolve, reject) => {
        articleTableRequest({
          page,
          per_page: 10,
          response_type: "comment",
        })
          .then((res) => {
            commit("setComments", res.data.data.results);
            resolve(res.data.data.total_count);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
  },
};
