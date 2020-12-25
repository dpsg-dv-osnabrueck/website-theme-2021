/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  currentPage: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.currentPage = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
  RESET_PAGE(state) {
    state.currentPage = {};
    requestStatus = requestStatus.init;
  },
};

export const actions = {
  getPage({ commit }, slug) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    wordpressAPI.getPage(slug)
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          commit('SET_REQUEST_STATUS', requestStatus.error);
        } else {
          commit('SET_DATA', response.data[0]);
          commit('SET_REQUEST_STATUS', requestStatus.ready);
        }
      })
      .catch((error) => {
        console.error(error);
        commit('SET_REQUEST_STATUS', requestStatus.error);
      });
  },

  resetPage({ commit }) {
    commit('RESET_PAGE');
  },

};
