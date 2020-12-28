/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  mainNavigation: {},
  footerNavigation: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_MAIN_NAVIGATION(state, data) {
    state.mainNavigation = data;
  },
  SET_FOOTER_NAVIGATION(state, data) {
    state.footerNavigation = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
};

export const actions = {

  getMainNavigation({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_REQUEST_STATUS', requestStatus.loading);
      wordpressAPI.getMenu(7)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_MAIN_NAVIGATION', response.data);
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

  getFooterNavigation({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_REQUEST_STATUS', requestStatus.loading);
      wordpressAPI.getMenu(46)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_FOOTER_NAVIGATION', response.data);
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

  getMenus({ dispatch }) {
    return new Promise((resolve) => {
      dispatch('getMainNavigation').then(() => {
        resolve();
      });
      dispatch('getFooterNavigation');
    });
  },

};
