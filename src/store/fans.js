import { getFansList } from "../service/user_request";
export default {
  namespaced: true,
  state: {
    Fans: [],
  },
  mutations: {
    setFansData(state, value) {
      state.Fans = value;
    },
  },
  actions: {
    getFans({ commit }, page = 1) {
      return new Promise((resolve, reject) => {
        getFansList({
          page,
          per_page: 24,
        })
          .then((res) => {
            commit("setFansData", res.data.data.results);
            resolve(res.data.data.total_count);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
