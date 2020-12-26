/* eslint-disable no-shadow */
import acfAPI from '@/api/acfAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  stageElements: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.stageElements = data;
  },

};

export const actions = {
  getStageElements({ commit }) {
    return new Promise((resolve, reject) => {
      acfAPI.getStageElements()
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_DATA', response.data.stageElements);
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
