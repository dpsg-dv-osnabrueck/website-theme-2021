/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  menus: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.menus = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
};

export const actions = {

  getMenus({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_REQUEST_STATUS', requestStatus.loading);
      wordpressAPI.getMenu(7)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_DATA', response.data);
            commit('SET_REQUEST_STATUS', requestStatus.ready);
            resolve();
          }
        })
        .catch((error) => {
          commit('SET_REQUEST_STATUS', requestStatus.error);
          reject(console.error(error));
        });
    });
  },

};
