/* eslint-disable no-shadow */
import acfAPI from '@/api/acfAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  data: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.data = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
};

export const actions = {
  getOptions({ commit }) {
    return new Promise((resolve, reject) => {
      acfAPI.getOptions()
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_DATA', response.data);
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
