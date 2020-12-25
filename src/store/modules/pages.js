/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  pages: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.pages = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
};

export const actions = {
  getPages({ commit }) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    wordpressAPI.getPages()
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          commit('SET_REQUEST_STATUS', requestStatus.error);
        } else {
          commit('SET_DATA', response.data);
          commit('SET_REQUEST_STATUS', requestStatus.ready);
        }
      })
      .catch((error) => {
        console.error(error);
        commit('SET_REQUEST_STATUS', requestStatus.error);
      });
  },
};
