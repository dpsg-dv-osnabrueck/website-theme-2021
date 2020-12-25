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
        } else {
          if (response.data[0]) {
            commit('SET_DATA', response.data[0]);
            dispatch('setSubNav', response.data[0].slug);
          } else {
            console.error('Page not found');
            commit('SET_REQUEST_STATUS', requestStatus.error);
          }

          commit('SET_REQUEST_STATUS', requestStatus.ready);
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
    const mergedItems = [];

    if (!items) return;

    items.forEach((item) => {
      if (item.children) {
        item.children.forEach((element) => {
          const newElement = { ...element };
          if (element.children) {
            const slug = [];
            element.children.forEach((subElement) => {
              slug.push(subElement.object_slug);
            });
            newElement.slugs = slug;
          }
          navItems.push(newElement);
        });
      }
    });

    navItems.forEach((item) => {
      if (item.slugs) {
        item.slugs.forEach((subItem) => {
          mergedItems.push({ ...item, object_slug: subItem });
        });
      }
    });

    mergedItems.push(...navItems);
    commit('SET_SUBNAV', find(mergedItems, { object_slug: slug }));
  },

};
