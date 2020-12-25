/* eslint-disable no-shadow */
import wordpressAPI from '@/api/wordpressAPI';
import requestStatus from '@/data/requestStatus';
import { find } from 'lodash';

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
    requestStatus = requestStatus.init;
  },
};

export const actions = {
  getPage({ commit, dispatch }, slug) {
    commit('SET_REQUEST_STATUS', requestStatus.loading);
    wordpressAPI.getPage(slug)
      .then((response) => {
        if (response.status !== 200) {
          console.error(response);
          commit('SET_REQUEST_STATUS', requestStatus.error);
        } else if (response.data[0]) {
          commit('SET_DATA', response.data[0]);
          dispatch('setSubNav', response.data[0].slug);
          if (response.data[0].featured_media) {
            dispatch('getFeaturedImage', response.data[0].featured_media).then(() => {
              commit('SET_REQUEST_STATUS', requestStatus.ready);
            });
          } else {
            commit('SET_REQUEST_STATUS', requestStatus.ready);
          }
        } else {
          commit('SET_DATA', null);
          commit('SET_REQUEST_STATUS', requestStatus.error);
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

  setSubNav({ commit, rootState }, slug) {
    const { items } = rootState.menus.menus;
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

  getFeaturedImage({ commit }, id) {
    return new Promise((resolve, reject) => {
      wordpressAPI.getMediaItem(id).then((response) => {
        if (response.status === 200) {
          commit('SET_FEATURED_IMAGE', response.data);
          resolve();
        }
      }).catch((error) => {
        console.log(error);
        reject();
      });
    });
  },

};
