export default {
  namespaced: true,

  state: {
    editArticle: {},
    radioType: 1,
  },
  mutations: {
    setArticle(state, data) {
      state.editArticle = data;
    },
    setRadioStatus(state, data) {
      state.radioType = data;
    },
  },
  actions: {},
};
