import Vue from 'vue';
import Vuex from 'vuex';
import cachingHelper from '@/helper/cachingHelper';
import storageHelper from '@/helper/storageHelper';
import storageNames from '@/data/storageNames';

import * as i18n from '@/store/modules/i18n';
import * as exampleModule from '@/store/modules/exampleModule';

Vue.use(Vuex);

export default new Vuex.Store({

  modules: {
    i18n,
    exampleModule,
  },

  mutations: {
    INITIALIZE_STATE(state, cachedState) {
      Object.assign(state, cachedState);
    },
  },

  actions: {
    initializeState({ state, commit }) {
      const cachedState = storageHelper.read(storageNames.VUEX_STORE);
      if (cachedState) {
        commit('INITIALIZE_STATE', cachingHelper.read(state, cachedState));
      }
    },
  },
});
