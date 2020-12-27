/* eslint-disable no-shadow */
import instagramAPI from '@/api/instagramAPI';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  data: {},
  requestStatus: requestStatus.init,
  creationDateToken: null,
};

export const mutations = {
  SET_DATA(state, data) {
    state.data = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
  SET_CREATION_DATE(state, data) {
    state.creationDateToken = data;
  },
};

export const actions = {
  getFeed({ commit, rootState }) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    return new Promise((resolve, reject) => {
      instagramAPI.getFeed(rootState.options.data.acf.instagramApi.apiKey)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_CREATION_DATE', new Date().getTime());
            commit('SET_DATA', response.data.data);
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

  refreshToken({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      instagramAPI.refreshToken(rootState.options.data.acf.instagramApi.apiKey)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else {
            commit('SET_DATA', response.data);
            commit('SET_CREATION_DATE', new Date().getTime());
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
