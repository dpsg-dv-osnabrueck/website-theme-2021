/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';
import imageHelper from '@/helper/imageHelper';

export const namespaced = true;

export const state = {
  currentPost: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.currentPost = data;
  },
  SET_FEATURED_IMAGE(state, data) {
    state.currentPage.featuredImage = data;
  },
  SET_REQUEST_STATUS(state, status) {
    state.requestStatus = status;
  },
  RESET_PAGE(state) {
    state.currentPage = {};
    state.requestStatus = requestStatus.init;
    state.teamImages = {};
  },
};

export const actions = {
  getPost({ commit }, slug) {
    return new Promise((resolve, reject) => {
      wordpressAPI.getPost(slug)
        .then((response) => {
          if (response.status !== 200) {
            commit('SET_REQUEST_STATUS', requestStatus.error);
            reject(console.error(response));
          } else if (response.data[0]) {
            commit('SET_DATA', response.data[0]);
            resolve();
          } else {
            commit('SET_DATA', null);
            commit('SET_REQUEST_STATUS', requestStatus.error);
            resolve();
          }
        })
        .catch((error) => {
          commit('SET_REQUEST_STATUS', requestStatus.error);
          reject(console.error(error));
        });
    });
  },

  resetPost({ commit }) {
    commit('RESET_PAGE');
  },

  getFeaturedImage({ commit, state }) {
    const id = state.currentPage.featured_media;
    return new Promise((resolve) => {
      if (id) {
        imageHelper(id, 'portrait').then((response) => {
          commit('SET_FEATURED_IMAGE', response);
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  loadPostData({ commit, dispatch }, slug) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    dispatch('resetPost');
    dispatch('getPost', slug).then(() => {
      dispatch('getFeaturedImage').then(() => {
        commit('SET_REQUEST_STATUS', requestStatus.ready);
      });
    });
  },
};
