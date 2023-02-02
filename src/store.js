// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    myUser: { roleType: { name: 'Guest' } },
  },
  mutations: {

    setMyUser(state, newUser) {
      state.myUser = newUser;
    },
  },
  actions: {
    updateMyUser({ commit }, newUser) {
      commit('setMyUser', newUser);
    },
  },
});
