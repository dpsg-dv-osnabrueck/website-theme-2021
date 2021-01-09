/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';
import { find } from 'lodash';
import imageHelper from '@/helper/imageHelper';

export const namespaced = true;

export const state = {
  currentPage: {},
  subNav: {},
  requestStatus: requestStatus.init,
};

export const mutations = {
  SET_DATA(state, data) {
    state.currentPage = data;
  },
  SET_FEATURED_IMAGE(state, data) {
    state.currentPage.featuredImage = data;
  },
  SET_SUBNAV(state, data) {
    state.subNav = data;
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
  getPage({ commit }, slug) {
    return new Promise((resolve, reject) => {
      wordpressAPI.getPage(slug)
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

  resetPage({ commit }) {
    commit('RESET_PAGE');
  },

  setSubNav({ commit, rootState }, slug) {
    const { items } = rootState.menus.mainNavigation;
    const navItems = [];

    if (!items) return;

    // 1st navigation layer
    items.forEach((navItem) => {
      if (navItem.children) {
        // 2nd navigation layer
        navItem.children.forEach((subNavItem) => {
          navItems.push(subNavItem);
          if (subNavItem.children) {
          // 3rd navigation layer
            subNavItem.children.forEach((subSubNavItem) => {
              navItems.push({ ...subNavItem, object_slug: subSubNavItem.object_slug });
            });
          }
        });
      }
    });

    commit('SET_SUBNAV', find(navItems, { object_slug: slug }));
  },

  getFeaturedImage({ commit, state }) {
    const id = state.currentPage.featured_media;
    return new Promise((resolve) => {
      if (id) {
        imageHelper(id, 'is-3by2').then((response) => {
          commit('SET_FEATURED_IMAGE', response);
          resolve();
        });
      } else {
        resolve();
      }
    });
  },

  loadPageData({ commit, dispatch }, slug) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    return new Promise((resolve) => {
      dispatch('resetPage');
      dispatch('getPage', slug).then(() => {
        dispatch('setSubNav', state.currentPage.slug);
        dispatch('getFeaturedImage').then(() => {
          commit('SET_REQUEST_STATUS', requestStatus.ready);
          resolve();
        });
      });
    });
  },
};
