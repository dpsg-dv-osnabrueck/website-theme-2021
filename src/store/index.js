import Vue from 'vue';
import Vuex from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';
import requestStatus from '@/data/requestStatus';

import * as i18n from '@/store/modules/i18n';
import * as menus from '@/store/modules/menus';
import * as page from '@/store/modules/page';
import * as options from '@/store/modules/options';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    requestStatus: requestStatus.init,
  },

  modules: {
    i18n,
    menus,
    page,
    options,
  },

  mutations: {
    INITIALIZE_STATE(state, cachedState) {
      Object.assign(state, cachedState);
    },
    SET_REQUEST_STATUS(state, status) {
      state.requestStatus = status;
    },
  },

  actions: {
    initializeState({ state, commit }) {
      const cachedState = storageHelper.read(storageNames.VUEX_STORE);
      if (cachedState) {
        commit('INITIALIZE_STATE', cachingHelper.read(state, cachedState));
      }
    },

    initializePage({ dispatch, commit }) {
      commit('SET_REQUEST_STATUS', requestStatus.loading);
      dispatch('menus/getMenus').then(() => {
        dispatch('options/getOptions').then(() => {
          commit('SET_REQUEST_STATUS', requestStatus.ready);
        });
      });
    },
  },
});
