/* eslint-disable no-shadow */
import german from '@/i18n/german';

export const namespaced = true;

export const state = {
  languageKeys: { ...german },
  locale: 'de-DE',
  user: {},
};

export const mutations = {
  CHANGE_LOCALE(state, locale) {
    state.locale = locale;
  },
};

export const actions = {
  changeLocale({ commit }, locale) {
    commit('CHANGE_LOCALE', locale);
  },
};

export const getters = {
  i18n: (state) => state.languageKeys,
};
