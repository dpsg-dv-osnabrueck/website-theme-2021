/* eslint-disable no-shadow */
import exampleApi from '@/api/exampleApi';
import requestStatus from '@/data/requestStatus';

export const namespaced = true;

export const state = {
  userData: {},
  responseData: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.userData = data;
  },
  SET_RESPONSE(state, data) {
    state.responseData = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
};

export const actions = {
  getData({ commit }) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    exampleApi.getData()
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

  postData({ commit }) {
    const payload = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    commit('SET_REQUEST_STATUS', requestStatus.loading);
    exampleApi.postData(payload)
      .then((response) => {
        if (response.status !== 201) {
          console.error(response);
          commit('SET_REQUEST_STATUS', requestStatus.error);
        } else {
          commit('SET_RESPONSE', response);
          commit('SET_REQUEST_STATUS', requestStatus.ready);
        }
      })
      .catch((error) => {
        console.error(error);
        commit('SET_REQUEST_STATUS', requestStatus.error);
      });
  },
};
